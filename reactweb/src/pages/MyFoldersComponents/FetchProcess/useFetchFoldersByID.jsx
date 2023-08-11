import axios from "axios";

export const useFetchFoldersByID = async (
  token,
  folderId,
  setSelectedFolder,
  setFolderPath,
  setFolderPathId
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(
      `https://localhost:7104/api/Folder/GetFolderByID/${folderId}`,
      config
    );

    const subfolder = {
      ...response.data,
      id: response.data.folderID,
      name: response.data.folderName,
      type: "folder",
    };

    setSelectedFolder(subfolder);
    setFolderPath((prevPath) => [...prevPath, subfolder.name]);
    setFolderPathId((prevPath) => [...prevPath, subfolder.folderID]);
  } catch (error) {
    console.error("Error fetching subfolder:", error);
  }
};
