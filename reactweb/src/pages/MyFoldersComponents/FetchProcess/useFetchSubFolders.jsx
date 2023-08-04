// useFetchSubFolders.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSubFolders = (folderID, token) => {
  const [subFolders, setSubFolders] = useState([]);

  useEffect(() => {
    if (folderID) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get(
          `https://localhost:7104/api/Folder/GetFoldersByParentFolderID/${folderID}`,
          config
        )
        .then((response) => {
          const subFoldersWithIds = response.data.map((folder) => ({
            ...folder,
            id: folder.folderID,
            name: folder.folderName,
            type: "folder",
          }));
          setSubFolders(subFoldersWithIds);
        })
        .catch((error) => {
          console.error("Error fetching subfolders:", error);
        });
    } else {
      setSubFolders([]);
    }
  }, [folderID, token]);

  return subFolders;
};

export default useFetchSubFolders;
