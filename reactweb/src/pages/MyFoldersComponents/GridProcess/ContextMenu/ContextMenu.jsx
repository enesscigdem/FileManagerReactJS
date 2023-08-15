import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import { DataGrid, GridCellModes } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {
  CreateNewFolderSharp,
  FileDownloadSharp,
  PageviewSharp,
  DeleteForeverSharp,
  DriveFileRenameOutlineSharp,
  CloudUploadSharp,
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

const ContextMenu = ({
  userID,
  token,
  parentFolderID,
  FileIdToDownload,
  FileNameToDownload,
  selectedpath,
  downloadType,
  fetchFiles,
  fetchSubFolders,
  setSuccessMessage,
  setImageUrl,
  setPdfUrl,
  setVideoUrl,
  setUploadProgress,
  setDownloadProgress,
  handleCloseMenu,
  setIsEditable,
  setEnterEditMode,
  selectedCellParams,
  cellModesModel,
  setCellModesModel,
  selectedFilesforDelete,
  setProgress,
}) => {
  const [selectedFiles, setSelectedFiles] = useState(null);

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
    if (selectedFiles) {
      handleUploadMultipleFiles();
    }
  }, [selectedFiles]);

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
        const pdfUrl = await getPdf(FileIdToDownload, token);

        setPdfUrl(pdfUrl);
      } else if (
        FileNameToDownload.toLowerCase().includes(".png") ||
        FileNameToDownload.toLowerCase().includes(".jpg")
      ) {
        const imageUrl = await getImage(FileIdToDownload, token);
        setImageUrl(imageUrl);
      } else {
        const videoUrl = await getVideo(FileIdToDownload, token);
        setVideoUrl(videoUrl);
      }
    }
    handleCloseMenu();
  };
  const handleDownloadFile = async () => {
    if (FileIdToDownload && FileNameToDownload) {
      handleCloseMenu();
      await DownloadFile(
        FileIdToDownload,
        FileNameToDownload,
        token,
        setSuccessMessage,
        setDownloadProgress,
        setProgress
      );
    }
  };
  const handleDownloadFolderByZip = async () => {
    handleCloseMenu();
    await DownloadFolderByZip(
      FileNameToDownload,
      selectedpath,
      token,
      setSuccessMessage,
      setDownloadProgress,
      setProgress
    );
  };
  const handleDeleteFile = async () => {
    handleCloseMenu();
    if (selectedFilesforDelete[1] !== undefined) {
      for (const fileDelete of selectedFilesforDelete) {
        await DeleteFile(fileDelete, token, setSuccessMessage);
        await DeleteFolder(fileDelete, token, setSuccessMessage);
      }
    } else {
      await DeleteFile(FileIdToDownload, token, setSuccessMessage);
      await DeleteFolder(FileIdToDownload, token, setSuccessMessage);
    }
    fetchFiles();
    fetchSubFolders();
  };
  const handleRename = () => {
    try {
      if (FileIdToDownload) {
        const { id, field } = selectedCellParams;
        setCellModesModel({
          ...cellModesModel,
          [id]: {
            ...cellModesModel[id],
            [field]: { mode: GridCellModes.Edit },
          },
        });
        setEnterEditMode(true);
        setIsEditable(true);
        handleCloseMenu();
      }
    } catch {}
  };
  const handleMultipleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleUploadMultipleFiles = async () => {
    handleCloseMenu();
    try {
      for (const file of selectedFiles) {
        await handleUploadFile(
          file,
          token,
          parentFolderID,
          setSuccessMessage,
          setUploadProgress,
          setProgress
        );
      }
      setSelectedFiles([]);
      fetchFiles();
      fetchSubFolders();
    } catch (error) {
      console.error("Multiple file upload failed:", error);
    }
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
          <MenuItem onClick={handleRename}>
            <ListItemIcon>
              <DriveFileRenameOutlineSharp fontSize="small" />
            </ListItemIcon>
            <Typography variant="overline">RENAME</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <CloudUploadSharp fontSize="small" />
            </ListItemIcon>
            <label
              htmlFor="fileInput2"
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
              id="fileInput2"
              style={{ display: "none" }}
              multiple
              onChange={handleMultipleFileChange}
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
            <MenuItem onClick={handleDeleteFile}>
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
