import React from "react";
import axios from "axios";

const RenameFilePage = async (fileID, fileName, token) => {
  debugger;
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.put(
      "https://localhost:7104/api/File/RenameFile",
      {
        fileID: fileID,
        fileName: fileName,
        path: " ",
      },
      config
    );
    return "Filename updated successfully!";
  } catch (error) {
    return "An error occurred while updating the filename!";
  }
};

export default RenameFilePage;