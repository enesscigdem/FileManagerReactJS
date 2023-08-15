import axios from "axios";

const DeleteFolder = async (FileIdToDownload, token, setSuccessMessage) => {
  const url = `https://localhost:7104/api/Folder/DeleteFolder/${FileIdToDownload}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSuccessMessage("Item deleted successfully!");
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};

export default DeleteFolder;
