import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Button } from "@mui/material";
import { DarkModeSharp, LightModeSharp } from "@mui/icons-material";
import { customTheme2 } from "../ThemeModes/customTheme2";
import { customTheme } from "../ThemeModes/customTheme";
import "../../../styles/popup.css";
import Box from "@mui/material/Box";
import columns from "../GridColumns/columns";
import NoRows from "./DataGridNoRows.jsx/NoRows";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ContextMenu from "./ContextMenu/ContextMenu";
import ImagePopup from "../ShowContent/Popups/ImagePopup";
import PdfPopup from "../ShowContent/Popups/PdfPopup";
import VideoPopup from "../ShowContent/Popups/VideoPopup";
import Path from "../Path/Path";
import Stack from "@mui/material/Stack";
import RenameFolderPage from "../FolderProcess/RenameFolder";
import RenameFilePage from "../FileProcess/RenameFile";
import UploadFileDrop from "../FileProcess/UploadFileDrop";
import SnackBarAlert from "../SnackBarAlert/SnackBarAlert";

const FileGrid = ({
  userID,
  token,
  rows,
  handleRowDoubleClick,
  handleRightClick: CellClick,
  parentFolderID,
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
  setIsEditable,
  isEditable,
  setSelectedFilesForDelete,
  selectedFilesforDelete,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "dark");
  const [enterEditMode, setEnterEditMode] = useState(null);
  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});

  const [, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (item) => handleFileDrop(item),
  });
  const handleFileDrop = async (item) => {
    await UploadFileDrop(
      item,
      token,
      parentFolderID,
      setSuccessMessage,
      setUploadProgress,
      fetchFiles,
      fetchSubFolders
    );
  };
  const handleToggle = (event) => {
    debugger;
    setAnchorPosition(
      event.clientX !== 0 && event.clientY !== 0
        ? { left: event.clientX, top: event.clientY }
        : null
    );
    setOpen((prevOpen) => !prevOpen);
  };

  const simulateClick = ({ left, top }) => {
    if (!isNaN(left) && isFinite(left) && !isNaN(top) && isFinite(top)) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      const element = document.elementFromPoint(left, top);
      element.dispatchEvent(event);
    }
  };
  const handleContextMenu = (event) => {
    event.preventDefault();
    const left = event.clientX !== 0 ? event.clientX : 0;
    const top = event.clientY !== 0 ? event.clientY : 0;
    setAnchorPosition({ left, top });
    setAnchorEl(event.currentTarget);
    simulateClick({ left, top });
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

  const changeMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const handleCellFocus = React.useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const handleCellEditStop = async (params, event) => {
    debugger;
    event.preventDefault();
    const { id, field } = params;
    const newValue = event.target.value;
    if (field === "name") {
      if (params.row.type === "folder") {
        handleRenameFolder(id, newValue);
      } else if (params.row.type === "file") {
        handleRenameFile(id, newValue);
      }
    }
  };
  const handleRenameFolder = async (folderID, folderName) => {
    setSuccessMessage(await RenameFolderPage(folderID, folderName, token));
    fetchFiles();
    fetchSubFolders();
  };
  const handleRenameFile = async (fileID, fileName) => {
    setSuccessMessage(await RenameFilePage(fileID, fileName, token));
    fetchFiles();
    fetchSubFolders();
  };

  return (
    <div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <SnackBarAlert
          setSuccessMessage={setSuccessMessage}
          successMessage={successMessage}
        />
      </Stack>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          style={{ fontSize: "12px" }}
          size="medium"
          color="inherit"
          startIcon={mode === "dark" ? <LightModeSharp /> : <DarkModeSharp />}
          onClick={changeMode}
        >
          change theme
        </Button>
        <Path
          folderPath={folderPath}
          folderPathId={folderPathId}
          setFolderPath={setFolderPath}
          onFolderClick={onFolderClick}
        />
      </div>

      {imageUrl && (
        <ImagePopup imageUrl={imageUrl} handleClose={handleCloseContent} />
      )}
      {pdfUrl && <PdfPopup pdfUrl={pdfUrl} handleClose={handleCloseContent} />}
      {videoUrl && (
        <VideoPopup videoUrl={videoUrl} handleClose={handleCloseContent} />
      )}
      {renderProgressText(uploadProgress, "File Uploading...")}
      {renderProgressText(downloadProgress, "Downloading File...")}

      <div
        style={{ height: "100%", width: "100%" }}
        ref={drop}
        onContextMenu={handleContextMenu}
      >
        <ThemeProvider theme={mode === "light" ? customTheme2 : customTheme}>
          <Box sx={{ height: "720px", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns(isEditable)}
              cellModesModel={cellModesModel}
              onCellEditStop={handleCellEditStop}
              onCellModesModelChange={(model) => setCellModesModel(model)}
              onRowSelectionModelChange={(newSelection) =>
                setSelectedFilesForDelete(newSelection)
              }
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 100 },
                },
                cell: {
                  onFocus: handleCellFocus,
                },
              }}
              slots={{ toolbar: GridToolbar, noRowsOverlay: () => <NoRows /> }}
              {...rows}
              initialState={{
                ...rows.initialState,
                pagination: { paginationModel: { pageSize: 15 } },
              }}
              pageSizeOptions={[15, 25, 50, 100]}
              rowHeight={61}
              pageSize={5}
              density="compact"
              onRowDoubleClick={handleRowDoubleClick}
              onCellClick={CellClick}
              onCellContextMenu={() => handleToggle()}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </ThemeProvider>
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        role={undefined}
        transition
        style={{
          position: "absolute",
          zIndex: 9999,
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
                userID={userID}
                token={token}
                parentFolderID={parentFolderID}
                FileIdToDownload={idd}
                FileNameToDownload={selectedFolderName}
                selectedpath={selectedpath}
                downloadType={downloadType}
                fetchFiles={fetchFiles}
                fetchSubFolders={fetchSubFolders}
                setSuccessMessage={setSuccessMessage}
                setImageUrl={setImageUrl}
                setPdfUrl={setPdfUrl}
                setVideoUrl={setVideoUrl}
                setUploadProgress={setUploadProgress}
                setDownloadProgress={setDownloadProgress}
                handleCloseMenu={handleCloseMenu}
                setIsEditable={setIsEditable}
                setEnterEditMode={setEnterEditMode}
                selectedCellParams={selectedCellParams}
                cellModesModel={cellModesModel}
                setCellModesModel={setCellModesModel}
                selectedFilesforDelete={selectedFilesforDelete}
              />
            </div>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
};

export default FileGrid;
