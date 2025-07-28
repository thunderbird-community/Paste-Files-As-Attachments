async function prepareComposeTab(tab) {
    if (tab.type != "messageCompose") {
        return;
    }

    await messenger.compose.getComposeDetails(tab.id);
    await messenger.tabs.executeScript(tab.id, {
        file: "compose.js"
    });
}

// Listen for messages from the compose script.
messenger.runtime.onMessage.addListener((info, sender, sendResponse) => {
    switch (info.command) {
        case "addAttachment":
            return browser.compose.addAttachment(sender.tab.id, { file: info.file });
        default:
            return false;
    }
});

// Load compose script into all open compose windows.
messenger.tabs.query({ type: "messageCompose" }).then(async composeTabs => {
    for (let composeTab of composeTabs) {
        await prepareComposeTab(composeTab);
    }
});

// Load compose script into any new compose window being opened.
messenger.tabs.onCreated.addListener(prepareComposeTab);

async function getState(tabId, options = {}) {
    let toggle = options.toggle ?? false;

    let { states } = await browser.storage.session.get({ states: new Map() });
    let current = states.has(tabId)
        ? states.get(tabId)
        : true;
    if (toggle) {
        current = !current;
        states.set(tabId, current);
        await browser.storage.session.set({ states });
    }
    return current;
}

// The default for each tab is to use the add-ons functionality, but it can be disabled
browser.composeAction.onClicked.addListener(async (tab, info) => {
    let status = await getState(tab.id, { toggle: true })
    browser.composeAction.setBadgeText({ tabId: tab.id, text: status ? "✔️" : "❌" })//✓✖️
    browser.tabs.sendMessage(tab.id, { setStatus: status })
})


// Defaults
browser.composeAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] })
browser.composeAction.setBadgeText({ text: "✔️"})
