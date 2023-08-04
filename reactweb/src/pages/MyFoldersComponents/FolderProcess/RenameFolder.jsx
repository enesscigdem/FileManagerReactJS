import axios from "axios";

const RenameFolderPage = async (folderID, folderName, token) => {
  debugger;
  try {
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
    return "Folder name successfully updated!";
  } catch (error) {
    console.error("Error renaming folder:", error);
    throw new Error("An error occurred while updating the folder name!");
  }
};

export default RenameFolderPage;
