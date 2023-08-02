import axios from "axios";
import { saveAs } from "file-saver";

const handleDownloadFolderByZip = async (
  FileNameToDownload,
  selectedpath,
  token,
  setSuccessMessage
) => {
  const url = `https://localhost:7104/api/Folder/DownloadFolder/${encodeURIComponent(
    FileNameToDownload
  )}?folderPath=${encodeURIComponent(selectedpath)}`;
  try {
    const response = await axios.get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fileName = FileNameToDownload + ".zip";

    saveAs(response.data, fileName);
    setSuccessMessage("Klasör başarıyla indirildi!");
    setTimeout(function () {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export default handleDownloadFolderByZip;
