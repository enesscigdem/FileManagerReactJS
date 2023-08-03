import React from "react";
import axios from "axios";

const DeleteFolder = async (FileIdToDownload, token, setSuccessMessage) => {
  debugger;
  const url = `https://localhost:7104/api/Folder/DeleteFolder/${FileIdToDownload}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSuccessMessage("Folder deleted successfully!");
    setTimeout(function () {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};

export default DeleteFolder;
