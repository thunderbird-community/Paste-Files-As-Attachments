function fileToDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // this will be the data URI
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

document.addEventListener("paste", async event => {
  if (!event.clipboardData.files.length) {
    return;
  }
  event.preventDefault();
  for (let file of event.clipboardData.files) {
    if (file.type.startsWith("image/")) {
      let attach = window.confirm(`Pasted image detected: Click OK to continue and attach "${file.name}", or abort to embed it into the message directly.`);
      if (!attach) {
        document.execCommand('insertHtml', false, `<img src="${await fileToDataUri(file)}" alt="">`);
        continue;
      }
    }
    await messenger.runtime.sendMessage({ command: "addAttachment", file });
  }
});
