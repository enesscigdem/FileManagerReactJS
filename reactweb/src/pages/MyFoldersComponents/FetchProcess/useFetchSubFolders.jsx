import axios from "axios";
export const useFetchSubFolders = async (token, folderID, setSubFolders) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(
      `https://localhost:7104/api/Folder/GetFoldersByParentFolderID/${folderID}`,
      config
    );

    const subFoldersWithIds = response.data.map((folder) => ({
      ...folder,
      id: folder.folderID,
      name: folder.folderName,
      type: "folder",
    }));
    setSubFolders(subFoldersWithIds);
  } catch (error) {
    console.error("Error fetching subfolders:", error);
  }
};
