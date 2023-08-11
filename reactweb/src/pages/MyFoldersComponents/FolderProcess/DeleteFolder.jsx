import axios from "axios";

const DeleteFolder = async (
  FileIdToDownload,
  token,
  setSuccessMessage,
  fetchFiles,
  fetchSubFolders
) => {
  debugger;
  const url = `https://localhost:7104/api/Folder/DeleteFolder/${FileIdToDownload}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSuccessMessage("Folder deleted successfully!");
    fetchFiles();
    fetchSubFolders();
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};

export default DeleteFolder;
