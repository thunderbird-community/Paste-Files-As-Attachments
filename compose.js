let pasteStatus = true;

browser.runtime.onMessage.addListener((request) => {
  if (Object.hasOwn(request, "setStatus")) {
    pasteStatus = request.setStatus;
  }
});

document.addEventListener("paste", async event => {
  if (!pasteStatus || !event.clipboardData.files.length) {
    return;
  }
  event.preventDefault();
  for (let file of event.clipboardData.files) {
    await messenger.runtime.sendMessage({ command: "addAttachment", file });
  }
});