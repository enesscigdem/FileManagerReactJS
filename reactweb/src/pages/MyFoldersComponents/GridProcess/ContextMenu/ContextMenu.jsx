import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {
  CreateNewFolderSharp,
  UploadFileSharp,
  FileDownloadSharp,
  PageviewSharp,
  DeleteForeverSharp,
  DriveFileRenameOutlineSharp,
} from "@mui/icons-material";
import handleCreateFolder from "../../FolderProcess/CreateFolder";
import DownloadFolderByZip from "../../FolderProcess/DownloadFolderByZip";
import handleUploadFile from "../../FileProcess/UploadFile";
import DownloadFile from "../../FileProcess/DownloadFile";
import DeleteFile from "../../FileProcess/DeleteFile";
import DeleteFolder from "../../FolderProcess/DeleteFolder";
import getPdf from "../../ShowContent/getPdf";
import getImage from "../../ShowContent/getImage";
import getVideo from "../../ShowContent/getVideo";
import Input from "@mui/material/Input";

const ContextMenu = ({
  type,
  userID,
  token,
  parentFolderID,
  FileIdToDownload,
  FileNameToDownload,
  selectedpath,
  downloadType,
  folderPath,
  folderPathId,
  setFolderPath,
  onFolderClick,
  fetchFiles,
  fetchSubFolders,
  setSuccessMessage,
  setImageUrl,
  setPdfUrl,
  setVideoUrl,
  setUploadProgress,
  setDownloadProgress,
  handleCloseMenu,
  handleContextMenu,
  setIsEditable,
}) => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const handleClickCreateFolder = async () => {
    await handleCreateFolder(
      token,
      userID,
      parentFolderID,
      setSuccessMessage,
      fetchFiles,
      fetchSubFolders
    );
    handleCloseMenu();
  };
  useEffect(() => {
    if (file) {
      debugger;
      handleUploadFileThis();
    }
  }, [file]);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFilePath(e.target.value);
    }
  };

  const handleUploadFileThis = async () => {
    debugger;
    await handleUploadFile(
      file,
      token,
      parentFolderID,
      setSuccessMessage,
      setUploadProgress,
      fetchFiles,
      fetchSubFolders
    );
    handleCloseMenu();
  };
  const handleShow = async () => {
    debugger;
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
  const handleDownloadFile = async () => {
    if (FileIdToDownload && FileNameToDownload) {
      await DownloadFile(
        FileIdToDownload,
        FileNameToDownload,
        token,
        setSuccessMessage,
        setDownloadProgress
      );
      handleCloseMenu();
    }
  };
  const handleDownloadFolderByZip = async () => {
    await DownloadFolderByZip(
      FileNameToDownload,
      selectedpath,
      token,
      setSuccessMessage,
      setDownloadProgress
    );
    handleCloseMenu();
  };
  const handleDeleteFile = async () => {
    if (FileIdToDownload) {
      await DeleteFile(
        FileIdToDownload,
        token,
        setSuccessMessage,
        fetchFiles,
        fetchSubFolders
      );
      handleCloseMenu();
    }
  };

  const handleDeleteFolder = async () => {
    if (FileIdToDownload) {
      await DeleteFolder(
        FileIdToDownload,
        token,
        setSuccessMessage,
        fetchFiles,
        fetchSubFolders
      );
      handleCloseMenu();
    }
  };
  const handleRenameFolder = () => {
    setIsEditable(true);
    handleCloseMenu();
  };
  return (
    <>
      <Paper sx={{ width: 200 }}>
        <MenuList>
          <MenuItem onClick={handleClickCreateFolder}>
            <ListItemIcon>
              <CreateNewFolderSharp fontSize="small" />
            </ListItemIcon>
            <Typography variant="overline">CREATE FOLDER</Typography>
          </MenuItem>
          <MenuItem onClick={handleRenameFolder}>
            <ListItemIcon>
              <DriveFileRenameOutlineSharp fontSize="small" />
            </ListItemIcon>
            <Typography variant="overline">RENAME FOLDER</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <UploadFileSharp fontSize="small" />
            </ListItemIcon>
            <label
              htmlFor="fileInput"
              style={{
                display: "inline-block",
                color: "inherit",
                cursor: "pointer",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "0.80rem",
                lineHeight: "2.66",
                letterSpacing: "0.08333em",
              }}
            >
              UPLOAD
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </MenuItem>
          {downloadType === "file" && (
            <MenuItem onClick={handleDownloadFile}>
              <ListItemIcon>
                <FileDownloadSharp fontSize="small" />
              </ListItemIcon>
              <Typography variant="overline">DOWNLOAD</Typography>
            </MenuItem>
          )}
          {downloadType !== "file" && (
            <MenuItem onClick={handleDownloadFolderByZip}>
              <ListItemIcon>
                <FileDownloadSharp fontSize="small" />
              </ListItemIcon>
              <Typography variant="overline">DOWNLOAD</Typography>
            </MenuItem>
          )}
          {downloadType === "file" && (
            <MenuItem onClick={handleDeleteFile}>
              <ListItemIcon>
                <DeleteForeverSharp fontSize="small" />
              </ListItemIcon>
              <Typography variant="overline">DELETE</Typography>
            </MenuItem>
          )}
          {downloadType !== "file" && (
            <MenuItem onClick={handleDeleteFolder}>
              <ListItemIcon>
                <DeleteForeverSharp fontSize="small" />
              </ListItemIcon>
              <Typography variant="overline">DELETE</Typography>
            </MenuItem>
          )}
          <MenuItem onClick={handleShow}>
            <ListItemIcon>
              <PageviewSharp fontSize="small" />
            </ListItemIcon>
            <Typography variant="overline">SHOW CONTENT</Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  );
};

export default ContextMenu;
