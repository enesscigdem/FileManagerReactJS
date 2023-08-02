import React from "react";
import axios from "axios";

const RenameFilePage = async (fileID, fileName, token) => {
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
    return "Dosya ismi başarıyla güncellendi!";
  } catch (error) {
    return "Dosya ismi güncellenirken bir hata oluştu!";
  }
};

export default RenameFilePage;
