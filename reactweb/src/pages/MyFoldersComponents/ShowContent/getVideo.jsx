import axios from "axios";
const getVideo = async (FileIdToDownload) => {
  try {
    const response = await axios.get(
      `https://localhost:7104/api/File/GetVideoByFileId/${FileIdToDownload}`,
      {
        responseType: "arraybuffer",
      }
    );

    const blob = new Blob([response.data], { type: "video/mp4" });
    const videoUrl = URL.createObjectURL(blob);
    return videoUrl;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};
export default getVideo;
