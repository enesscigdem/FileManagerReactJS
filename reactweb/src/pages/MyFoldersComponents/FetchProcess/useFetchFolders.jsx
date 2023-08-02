import React, { useState, useEffect } from "react";
import axios from "axios";
const useFetchFolders = ({ userID, token }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `https://localhost:7104/api/Folder/GetFoldersByUserID/${userID}`,
          config
        );

        const foldersWithIds = response.data.map((folder) => ({
          ...folder,
          id: folder.folderID,
          name: folder.folderName,
          type: "folder",
        }));

        setFolders(foldersWithIds);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    if (userID) {
      fetchFolders();
    }
  }, [userID, token]);

  return folders;
};
export default useFetchFolders;
