const handleUpload = (file: File) => {
  console.log("Uploading file:", file);
}

const handleDownload = (fileId: number) => {
  console.log("Downloading file with ID::", fileId);
};

const handleRename = (fileId: number) => {
  console.log("Renaming file with ID:", fileId);
};

const handleDelete = (fileId: number) => {
  console.log("Deleting file with ID:", fileId);
};

const handleShare = (fileId: number) => {
  console.log("Sharing file with ID:", fileId);
};

export { handleUpload, handleDownload, handleRename, handleDelete, handleShare };
