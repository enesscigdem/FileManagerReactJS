import axios from "axios";

const RenameFolderPage = async (folderID, folderName, token) => {
  try {
    debugger;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.put(
      "https://localhost:7104/api/Folder/RenameFolder",
      {
        folderID: folderID,
        folderName: folderName,
        Path: " ",
      },
      config
    );

    return "Foldername updated successfully!";
  } catch (error) {
    throw new Error("An error occurred while updating the folder name!");
  }
};

export default RenameFolderPage;
