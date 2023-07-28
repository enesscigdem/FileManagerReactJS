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
    setSuccessMessage("Klasör başarıyla oluşturuldu!");
    window.location.reload();
  } catch (error) {
    setSuccessMessage("Klasör başarıyla oluşturuldu!");
    window.location.reload();
  }
};
export default handleCreateFolder;
