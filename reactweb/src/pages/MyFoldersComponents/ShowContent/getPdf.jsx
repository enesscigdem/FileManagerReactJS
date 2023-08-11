import axios from "axios";
const getPdf = async (FileIdToDownload, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(
      `https://localhost:7104/api/File/GetPdfByFileId/${FileIdToDownload}`,
      { responseType: "arraybuffer", ...config }
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
