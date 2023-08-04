import React, { useState, useEffect } from "react";
import axios from "axios";
const useFetchAllFolders = ({ token }) => {
  const [foldersAll, setFoldersAll] = useState([]);

  useEffect(() => {
    const fetchFoldersAll = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `https://localhost:7104/api/Folder/GetAllFolders/`,
          config
        );

        const foldersWithIds = response.data.map((folder) => ({
          ...folder,
          id: folder.folderID,
          name: folder.folderName,
          type: "folder",
        }));

        setFoldersAll(foldersWithIds);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFoldersAll();
  }, [token]);

  return foldersAll;
};
export default useFetchAllFolders;
