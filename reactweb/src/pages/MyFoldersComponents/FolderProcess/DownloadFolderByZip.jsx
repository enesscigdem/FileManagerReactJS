import axios from "axios";
import { saveAs } from "file-saver";

const handleDownloadFolderByZip = async (
  FileNameToDownload,
  selectedpath,
  token,
  setSuccessMessage,
  setDownloadProgress
) => {
  const url = `https://localhost:7104/api/Folder/DownloadFolder/${encodeURIComponent(
    FileNameToDownload
  )}?folderPath=${encodeURIComponent(selectedpath)}`;
  try {
    setSuccessMessage("Downloading File...");
    const response = await axios.get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setDownloadProgress(percentCompleted);
      },
    });
    const fileName = FileNameToDownload + ".zip";

    saveAs(response.data, fileName);
    setSuccessMessage("Folder downloaded successfully!");
    fetchFiles();
    fetchSubFolders();
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export default handleDownloadFolderByZip;
