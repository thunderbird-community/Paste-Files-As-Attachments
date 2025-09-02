document.addEventListener("paste", async event => {
  if (!event.clipboardData.files.length) {
    return;
  }
  event.preventDefault();
  for (let file of event.clipboardData.files) {
    await messenger.runtime.sendMessage({ command: "addAttachment", file });
  }
});