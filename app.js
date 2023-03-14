const inputElement = document.getElementById("file-input");
const fileList = document.getElementById("file-list");
const totalSize = document.getElementById("total-size");
let fileCount = 0;

inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  const files = this.files;
  fileList.innerHTML = "";
  totalSize.innerHTML = "";
  fileCount = files.length;

  if (fileCount === 0) {
    fileList.innerHTML = "Выберите файлы";
    return;
  }

  let totalFileSize = 0;

  for (let i = 0; i < fileCount; i++) {
    const fileSize = files[i].size;
    const fileName = files[i].name;
    const li = document.createElement("li");
    li.innerHTML = `${fileName} (${formatFileSize(fileSize)})`;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Удалить";
    deleteButton.addEventListener("click", () => {
      li.remove();
      fileCount--;
      totalFileSize -= fileSize;
      totalSize.innerHTML = `Выбрано файлов: ${fileCount}, общий размер: ${formatFileSize(
        totalFileSize
      )}`;
    });
    li.appendChild(deleteButton);
    fileList.appendChild(li);
    totalFileSize += fileSize;
  }

  totalSize.innerHTML = `Выбрано файлов: ${fileCount}, общий размер: ${formatFileSize(
    totalFileSize
  )}`;
}

function formatFileSize(size) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${Math.round(size)} ${units[i]}`;
}
