import React from "react";
import axios from "axios";

const RenameFolderPage = async (folderID, folderName, token) => {
  debugger;
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.put(
      "https://localhost:7104/api/Folder/RenameFolder",
      {
        folderID: folderID,
        folderName: folderName,
        path: " ",
      },
      config
    );
    return "Folder name successfully updated!";
  } catch (error) {
    return "An error occurred while updating the folder name!";
  }
};

export default RenameFolderPage;
