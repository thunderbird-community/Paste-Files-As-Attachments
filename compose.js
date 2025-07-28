document.addEventListener("paste", async event => {
  // Abort, iff the clipboardData does not have files or some non-file elements.
  if (!event.clipboardData.files.length || event.clipboardData.items.length) {
    return;
  }
  event.preventDefault();
  for (let file of event.clipboardData.files) {
    await messenger.runtime.sendMessage({ command: "addAttachment", file });
  }
});