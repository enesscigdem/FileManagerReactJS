import axios from "axios";

export const useFetchFiles = async (token, folderID, setFiles) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(
      `https://localhost:7104/api/File/GetFilesByFolderID/${folderID}`,
      config
    );

    const filesWithIds = response.data.map((file) => ({
      ...file,
      id: file.fileID,
      name: file.fileName,
      type: "file",
    }));
    setFiles(filesWithIds);
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};
