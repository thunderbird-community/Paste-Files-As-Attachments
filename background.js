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
