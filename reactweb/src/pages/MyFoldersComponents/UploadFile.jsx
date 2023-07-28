import React, { useState } from "react";
import axios from "axios";

debugger;
const handleUploadFile = async (
  file,
  fileName,
  token,
  userID,
  parentFolderID,
  setSuccessMessage,
  size,
  path
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

    const response = await axios.post(
      "https://localhost:7104/api/File/UploadFile",
      formData,
      config
    );

    if (response.data.success) {
      setSuccessMessage("Dosya başarıyla yüklendi!");
    } else {
      setSuccessMessage("Dosya yükleme başarısız!");
    }
  } catch (error) {
    setSuccessMessage("Dosya yükleme başarısız!");
  }
};

export default handleUploadFile;
