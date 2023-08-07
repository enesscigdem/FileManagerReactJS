import React from "react";
import axios from "axios";

const DeleteFile = async (
  FileIdToDownload,
  token,
  setSuccessMessage,
  fetchFiles,
  fetchSubFolders
) => {
  debugger;
  const url = `https://localhost:7104/api/File/DeleteFile/${FileIdToDownload}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSuccessMessage("File deleted successfully!");
    fetchFiles();
    fetchSubFolders();
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
export default DeleteFile;
