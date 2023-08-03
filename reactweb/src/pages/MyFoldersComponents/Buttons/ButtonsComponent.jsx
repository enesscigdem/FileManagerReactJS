import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  CreateNewFolder,
  UploadFileSharp,
  FileDownload,
  Pageview,
  CloudUpload,
} from "@mui/icons-material";
import Input from "@mui/material/Input";
import handleCreateFolder from "../FolderProcess/CreateFolder";
import handleUploadFile from "../FileProcess/UploadFile";
import DownloadFolderByZip from "../FolderProcess/DownloadFolderByZip";
import DownloadFile from "../FileProcess/DownloadFile";
import DeleteFile from "../FileProcess/DeleteFile";
import DeleteFolder from "../FolderProcess/DeleteFolder";
import getImage from "../ShowContent/getImage";
import getPdf from "../ShowContent/getPdf";
import getVideo from "../ShowContent/getVideo";
import ImagePopup from "../ShowContent/Popups/ImagePopup";
import PdfPopup from "../ShowContent/Popups/PdfPopup";
import VideoPopup from "../ShowContent/Popups/VideoPopup";
import "../../../styles/popup.css";

const ButtonsComponent = ({
  type,
  userID,
  token,
  parentFolderID,
  FileIdToDownload,
  FileNameToDownload,
  selectedpath,
  downloadType,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleShow = async () => {
    if (
      FileNameToDownload &&
      (FileNameToDownload.toLowerCase().includes(".pdf") ||
        FileNameToDownload.toLowerCase().includes(".png") ||
        FileNameToDownload.toLowerCase().includes(".jpg") ||
        FileNameToDownload.toLowerCase().includes(".mp4") ||
        FileNameToDownload.toLowerCase().includes(".avi") ||
        FileNameToDownload.toLowerCase().includes(".mkv"))
    ) {
      if (FileNameToDownload.toLowerCase().includes(".pdf")) {
        const pdfUrl = await getPdf(FileIdToDownload);
        setPdfUrl(pdfUrl);
      } else if (
        FileNameToDownload.toLowerCase().includes(".png") ||
        FileNameToDownload.toLowerCase().includes(".jpg")
      ) {
        const imageUrl = await getImage(FileIdToDownload);
        setImageUrl(imageUrl);
      } else {
        const videoUrl = await getVideo(FileIdToDownload);
        setVideoUrl(videoUrl);
      }
    }
  };
  const handleClose = () => {
    setImageUrl(null);
    setPdfUrl(null);
    setVideoUrl(null);
  };

  useEffect(() => {
    if (file) {
      handleUploadFileThis();
    }
  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFilePath(e.target.value);
      debugger;
    }
  };

  const handleClickCreateFolder = async () => {
    await handleCreateFolder(token, userID, parentFolderID, setSuccessMessage);
  };
  const handleUploadFileThis = async () => {
    debugger;
    await handleUploadFile(
      file,
      token,
      parentFolderID,
      setSuccessMessage,
      setUploadProgress
    );
  };

  const handleDownloadFile = async () => {
    await DownloadFile(
      FileIdToDownload,
      FileNameToDownload,
      token,
      setSuccessMessage,
      setDownloadProgress
    );
  };
  const handleDownloadFolderByZip = async () => {
    await DownloadFolderByZip(
      FileNameToDownload,
      selectedpath,
      token,
      setSuccessMessage,
      setDownloadProgress
    );
  };
  const handleDeleteFile = async () => {
    await DeleteFile(FileIdToDownload, token, setSuccessMessage);
  };
  const handleDeleteFolder = async () => {
    debugger;
    await DeleteFolder(FileIdToDownload, token, setSuccessMessage);
  };
  const renderProgressText = (progress, action) =>
    progress > 0 &&
    progress < 100 && (
      <div
        style={{
          marginTop: "10px",
          color: "green",
          fontWeight: "900",
          fontSize: "16px",
        }}
      >
        {action}.. {progress}%
      </div>
    );
  return (
    <>
      <Stack
        marginTop={2}
        marginBottom={2}
        spacing={2}
        height={60}
        direction="row"
        alignItems="center"
      >
        <Button
          size="small"
          color="success"
          variant="contained"
          onClick={handleClickCreateFolder}
          startIcon={<CreateNewFolder />}
        >
          Klasör Oluştur
        </Button>
        <React.Fragment>
          <Input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <Button
              component="span"
              size="small"
              color="primary"
              variant="contained"
              startIcon={<CloudUpload />}
            >
              Upload File
            </Button>
          </label>
        </React.Fragment>

        {downloadType === "file" ? (
          <>
            <Button
              size="small"
              color="warning"
              variant="contained"
              onClick={handleDownloadFile}
              startIcon={<FileDownload />}
            >
              Download File
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              color="warning"
              variant="contained"
              onClick={handleDownloadFolderByZip}
              startIcon={<FileDownload />}
            >
              Download File
            </Button>
          </>
        )}
        {downloadType === "file" ? (
          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<UploadFileSharp />}
            onClick={handleDeleteFile}
          >
            Delete
          </Button>
        ) : (
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleDeleteFolder}
            startIcon={<UploadFileSharp />}
          >
            Delete
          </Button>
        )}

        {type === "folder" ? (
          <></>
        ) : (
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => window.location.reload()}
          >
            Home Page
          </Button>
        )}

        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleShow}
          startIcon={<Pageview />}
        >
          Show Content (pic, video, pdf)
        </Button>
      </Stack>
      {imageUrl && <ImagePopup imageUrl={imageUrl} handleClose={handleClose} />}
      {pdfUrl && <PdfPopup pdfUrl={pdfUrl} handleClose={handleClose} />}
      {videoUrl && <VideoPopup videoUrl={videoUrl} handleClose={handleClose} />}
      {renderProgressText(uploadProgress, "File Uploading...")}
      {renderProgressText(downloadProgress, "Downloading File...")}
      {successMessage && (
        <div style={{ color: "green", fontWeight: "900", fontSize: "18px" }}>
          {successMessage}
        </div>
      )}
      <style>
        {`
            .boldHeader .MuiDataGrid-columnHeaderTitle {
              font-weight: bold;
            }
          `}
      </style>
    </>
  );
};
export default ButtonsComponent;
