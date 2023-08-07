import axios from "axios";
import { saveAs } from "file-saver";

const DownloadFile = async (
  FileIdToDownload,
  FileNameToDownload,
  token,
  setSuccessMessage,
  setDownloadProgress,
  fetchFiles,
  fetchSubFolders
) => {
  const url = `https://localhost:7104/api/File/DownloadFile/${FileIdToDownload}`;
  try {
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
    const fileName = FileNameToDownload;

    saveAs(response.data, fileName);
    setSuccessMessage("The file has been downloaded successfully!");
    fetchFiles();
    fetchSubFolders();
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export default DownloadFile;
