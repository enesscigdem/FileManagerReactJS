import axios from "axios";
const getPdf = async (FileIdToDownload) => {
  try {
    const response = await axios.get(
      `https://localhost:7104/api/File/GetPdfByFileId/${FileIdToDownload}`,
      { responseType: "arraybuffer" }
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(blob);
    return pdfUrl;
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return null;
  }
};
export default getPdf;
