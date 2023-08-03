import React, { useState } from "react";
import axios from "axios";
const handleCreateFolder = async (
  token,
  userID,
  parentFolderID,
  setSuccessMessage
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    debugger;
    await axios.post(
      "https://localhost:7104/api/Folder/CreateFolder",
      {
        folderName: "NewFolder",
        path: " ",
        userID,
        parentFolderID,
      },
      config
    );
    setSuccessMessage("Folder created successfully!");
    setTimeout(function () {
      window.location.reload();
    }, 500);
  } catch (error) {
    setSuccessMessage(
      "A folder with the same name already exists for this user in the same location."
    );
    window.location.reload();
  }
};
export default handleCreateFolder;
