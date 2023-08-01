import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  CreateNewFolder,
  UploadFileSharp,
  FileDownload,
} from "@mui/icons-material";
import Input from "@mui/material/Input";
import handleCreateFolder from "./CreateFolder";
import handleUploadFile from "./UploadFile";
import DownloadFolderByZip from "./DownloadFolderByZip";
import DownloadFile from "./DownloadFile";
import DeleteFile from "./DeleteFile";
import DeleteFolder from "./DeleteFolder";
import "../../styles/popup.css";

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

  const getImage = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7104/api/File/GetImageByFileId/${FileIdToDownload}`,
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "image/jpeg" });
      const imgUrl = URL.createObjectURL(blob);
      setImageUrl(imgUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleShowImage = () => {
    getImage();
  };

  const handleCloseImage = () => {
    setImageUrl(null);
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
    await handleUploadFile(file, token, parentFolderID, setSuccessMessage);
  };

  const handleDownloadFile = async () => {
    await DownloadFile(
      FileIdToDownload,
      FileNameToDownload,
      token,
      setSuccessMessage
    );
  };
  const handleDownloadFolderByZip = async () => {
    await DownloadFolderByZip(
      FileNameToDownload,
      selectedpath,
      token,
      setSuccessMessage
    );
  };
  const handleDeleteFile = async () => {
    await DeleteFile(FileIdToDownload, token, setSuccessMessage);
  };
  const handleDeleteFolder = async () => {
    debugger;
    await DeleteFolder(FileIdToDownload, token, setSuccessMessage);
  };
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
              startIcon={<CloudUploadIcon />}
            >
              Dosya Yükle
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
              Dosya İndir
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
              Dosya İndir
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
            Sil
          </Button>
        ) : (
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleDeleteFolder}
            startIcon={<UploadFileSharp />}
          >
            Sil
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
            Ana Sayfa
          </Button>
        )}
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={handleShowImage}
        >
          İçeriği Göster
        </Button>
      </Stack>
      {imageUrl && (
        <div className="image-popup">
          <span className="close" onClick={handleCloseImage}>
            &times;
          </span>
          <img src={imageUrl} alt="Popup Image" />
        </div>
      )}
      {successMessage && (
        <div style={{ color: "green", fontWeight: "900", fontSize: "16px" }}>
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
