import axios from "axios";

export const useFetchFolders = async (token, userID, setFolders) => {
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
