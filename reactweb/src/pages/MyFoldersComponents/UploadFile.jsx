import React, { useState } from "react";
import axios from "axios";

const handleUploadFile = async (
  file,
  token,
  parentFolderID,
  setSuccessMessage
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    debugger;
    const response = await axios.post(
      `https://localhost:7104/api/File/UploadFile?folderID=${parentFolderID}`,
      formData,
      config
    );
    if (response.status === 200) {
      setSuccessMessage("Dosya başarıyla yüklendi!");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } else {
      setSuccessMessage("Dosya yükleme başarısız!");
    }
  } catch (error) {
    setSuccessMessage("Dosya yükleme başarısız!");
  }
};

export default handleUploadFile;
