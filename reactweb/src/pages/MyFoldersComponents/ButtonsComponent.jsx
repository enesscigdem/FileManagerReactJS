import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Input from "@mui/material/Input";
import handleCreateFolder from "./CreateFolder";
import handleUploadFile from "./UploadFile";
import { saveAs } from "file-saver";

const ButtonsComponent = ({ type, userID, token, parentFolderID }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
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
    debugger;
    const fileId = 1250;
    const url = `https://localhost:7104/api/File/DownloadFile/${fileId}`;
    try {
      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Dosya adını URL'den al
      const fileName = url.split("/").pop();

      saveAs(response.data, fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
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
        <Button size="small" color="warning" variant="contained">
          Klasör Yükle
        </Button>
        {type === "folder" ? (
          <></>
        ) : (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => window.location.reload()}
          >
            Ana Sayfa
          </Button>
        )}
        <Button
          size="small"
          color="info"
          variant="contained"
          onClick={handleDownloadFile}
        >
          Dosya İndir
        </Button>
      </Stack>
      {successMessage && (
        <div style={{ color: "green", fontWeight: "bold" }}>
          {successMessage}
        </div>
      )}
      {file && (
        <section>
          <br />
          File details: <br />
          <br />
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
            <li>Path: {filePath} bytes</li>
          </ul>
        </section>
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
