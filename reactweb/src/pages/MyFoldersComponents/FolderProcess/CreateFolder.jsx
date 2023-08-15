import axios from "axios";
const handleCreateFolder = async (
  token,
  userID,
  parentFolderID,
  setSuccessMessage,
  fetchFiles,
  fetchSubFolders
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.post(
      "https://localhost:7104/api/Folder/CreateFolder",
      {
        folderName: "NewFolder",
        path: " ",
        userID,
        parentFolderID,
      },
      config
    );
    setSuccessMessage("Folder created successfully!");
    fetchFiles();
    fetchSubFolders();
  } catch (error) {
    console.error("Error creating folder:", error);
    setSuccessMessage("An error occurred while creating the folder!");
  }
};
export default handleCreateFolder;
