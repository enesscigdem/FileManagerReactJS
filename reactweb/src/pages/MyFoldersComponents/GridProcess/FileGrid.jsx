import React, { useState, useRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider from the correct location

import Box from "@mui/material/Box";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import ButtonsComponent from "../Buttons/ButtonsComponent";
import columns from "../GridColumns/columns";
import axios from "axios";
import NoRows from "./DataGridNoRows.jsx/NoRows";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ContextMenu from "./ContextMenu/ContextMenu";
import ImagePopup from "../ShowContent/Popups/ImagePopup";
import PdfPopup from "../ShowContent/Popups/PdfPopup";
import VideoPopup from "../ShowContent/Popups/VideoPopup";
import "../../../styles/popup.css";
import { Margin } from "@mui/icons-material";
const customTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#004080",
    },
    secondary: {
      main: "#ff5722",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  shape: {
    borderRadius: 20,
  },
  shadows: ["none"],
});

const FileGrid = ({
  userID,
  token,
  folderName,
  rows,
  folderID,
  handleRowClick,
  handleRightClick,
  currentPath,
  parentFolderID,
  handleEditCellChange,
  idd,
  selectedFolderName,
  selectedpath,
  downloadType,
  folderPath,
  folderPathId,
  setFolderPath,
  onFolderClick,
  fetchFiles,
  fetchSubFolders,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [anchorPosition, setAnchorPosition] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleFileDrop = async (item) => {
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
            setUploadProgress(percentCompleted);
          },
        }
      );
      setSuccessMessage("File uploaded successfully!");
      fetchFiles();
      fetchSubFolders();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const [, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (item) => handleFileDrop(item),
  });
  if (!folderID || !folderName) {
    return null;
  }

  const handleToggle = (event) => {
    setAnchorPosition(
      event.clientX !== 0 && event.clientY !== 0
        ? { left: event.clientX, top: event.clientY }
        : null
    );
    setOpen((prevOpen) => !prevOpen);
  };
  const handleContextMenu = (event) => {
    debugger;
    event.preventDefault();
    setAnchorPosition({ left: event.clientX, top: event.clientY });
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleCloseContent = () => {
    setImageUrl(null);
    setPdfUrl(null);
    setVideoUrl(null);
  };
  const handleCloseMenu = () => {
    setAnchorPosition(null);
    setAnchorEl(null);
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
  const augmentedRows = rows.length === 0 ? [{ id: "__dummy_row__" }] : rows;
  return (
    <div>
      <ButtonsComponent
        type="file"
        userID={userID}
        token={token}
        parentFolderID={parentFolderID}
        FileIdToDownload={idd}
        FileNameToDownload={selectedFolderName}
        selectedpath={selectedpath}
        downloadType={downloadType}
        folderPath={folderPath}
        folderPathId={folderPathId}
        setFolderPath={setFolderPath}
        onFolderClick={onFolderClick}
        fetchFiles={fetchFiles}
        fetchSubFolders={fetchSubFolders}
      />
      {imageUrl && (
        <ImagePopup imageUrl={imageUrl} handleClose={handleCloseContent} />
      )}
      {pdfUrl && <PdfPopup pdfUrl={pdfUrl} handleClose={handleCloseContent} />}
      {videoUrl && (
        <VideoPopup videoUrl={videoUrl} handleClose={handleCloseContent} />
      )}
      {renderProgressText(uploadProgress, "File Uploading...")}
      {renderProgressText(downloadProgress, "Downloading File...")}
      {successMessage && (
        <div style={{ color: "green", fontWeight: "bold" }}>
          {successMessage}
        </div>
      )}
      <div
        style={{ height: "100%", width: "100%" }}
        ref={drop}
        onContextMenu={handleContextMenu}
      >
        <ThemeProvider theme={customTheme}>
          <Box sx={{ height: "720px", width: "100%" }}>
            <DataGrid
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 100 },
                },
              }}
              slots={{ toolbar: GridToolbar, noRowsOverlay: () => <NoRows /> }}
              rows={augmentedRows}
              columns={columns}
              {...rows}
              initialState={{
                ...rows.initialState,
                pagination: { paginationModel: { pageSize: 15 } },
              }}
              pageSizeOptions={[15, 25, 50, 100]}
              rowHeight={61}
              pageSize={5}
              checkboxSelection
              density="compact"
              onRowDoubleClick={handleRowClick}
              onCellClick={handleRightClick}
              // onRowClick={handleRightClick}
              onCellEditStop={handleEditCellChange}
              onCellContextMenu={() => handleToggle()}
            />
          </Box>
        </ThemeProvider>
      </div>

      {anchorEl && (
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          role={undefined}
          transition
          style={{
            left: anchorPosition ? anchorPosition.left : undefined,
            top: anchorPosition ? anchorPosition.top : undefined,
          }}
        >
          {({ TransitionProps, placement }) => (
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
                  borderRadius: "4px",
                  padding: "5px",
                }}
              >
                <ContextMenu
                  type="file"
                  userID={userID}
                  token={token}
                  parentFolderID={parentFolderID}
                  FileIdToDownload={idd}
                  FileNameToDownload={selectedFolderName}
                  selectedpath={selectedpath}
                  downloadType={downloadType}
                  folderPath={folderPath}
                  folderPathId={folderPathId}
                  setFolderPath={setFolderPath}
                  onFolderClick={onFolderClick}
                  fetchFiles={fetchFiles}
                  fetchSubFolders={fetchSubFolders}
                  setSuccessMessage={setSuccessMessage}
                  setImageUrl={setImageUrl}
                  setPdfUrl={setPdfUrl}
                  setVideoUrl={setVideoUrl}
                  setUploadProgress={setUploadProgress}
                  setDownloadProgress={setDownloadProgress}
                  handleCloseMenu={handleCloseMenu}
                  handleContextMenu={handleContextMenu}
                />
              </div>
            </ClickAwayListener>
          )}
        </Popper>
      )}
    </div>
  );
};

export default FileGrid;
