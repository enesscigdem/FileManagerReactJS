import axios from "axios";
const getImage = async (FileIdToDownload, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.get(
      `https://localhost:7104/api/File/GetImageByFileId/${FileIdToDownload}`,
      {
        responseType: "arraybuffer",
        ...config,
      }
    );

    const blob = new Blob([response.data], { type: "image/jpeg" });
    const imgUrl = URL.createObjectURL(blob);
    return imgUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
export default getImage;
