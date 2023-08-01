import axios from "axios";

const DownloadFile = async (
  FileIdToDownload,
  FileNameToDownload,
  token,
  setSuccessMessage
) => {
  const url = `https://localhost:7104/api/File/DownloadFile/${FileIdToDownload}`;
  try {
    const response = await axios.get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fileName = FileNameToDownload;

    saveAs(response.data, fileName);
    setSuccessMessage("Dosya başarıyla indirildi!");
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
export default DownloadFile;
