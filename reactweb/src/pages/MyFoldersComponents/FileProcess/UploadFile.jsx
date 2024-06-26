import axios from "axios";

const handleUploadFile = async (
  file,
  token,
  parentFolderID,
  setSuccessMessage,
  setUploadProgress,
  setProgress
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };
    const response = await axios.post(
      `https://localhost:7104/api/File/UploadFile?folderID=${parentFolderID}`,
      formData,
      config
    );
    if (response.status === 200) {
      setSuccessMessage("File uploaded successfully!");
    } else {
      setSuccessMessage("File upload failed!");
    }
  } catch (error) {
    setSuccessMessage("File upload failed!");
  }
};

export default handleUploadFile;
