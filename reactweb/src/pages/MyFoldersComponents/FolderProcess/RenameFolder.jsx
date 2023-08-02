import React from "react";
import axios from "axios";

const RenameFolderPage = async (folderID, folderName, token) => {
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
    return "Klasör ismi başarıyla güncellendi!";
  } catch (error) {
    return "Klasör ismi güncellenirken bir hata oluştu!";
  }
};

export default RenameFolderPage;
