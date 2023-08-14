import axios from "axios";

const UploadFileDrop = async (
  item,
  token,
  parentFolderID,
  setSuccessMessage,
  setProgress
) => {
  try {
    const file = item.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `https://localhost:7104/api/File/UploadFile?folderID=${parentFolderID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      }
    );
    setSuccessMessage("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
export default UploadFileDrop;
