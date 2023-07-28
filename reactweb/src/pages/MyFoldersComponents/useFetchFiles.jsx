import React, { useState, useEffect } from "react";
import axios from "axios";
const useFetchFiles = (folderID, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (folderID) {
      axios
        .get(
          `https://localhost:7104/api/File/GetFilesByFolderID/${folderID}`,
          config
        )
        .then((response) => {
          const filesWithIds = response.data.map((file) => ({
            ...file,
            id: file.fileID,
            name: file.fileName,
            type: "file",
          }));
          setFiles(filesWithIds);
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
        });
    } else {
      setFiles([]);
    }
  }, [folderID, token]);

  return files;
};
export default useFetchFiles;
