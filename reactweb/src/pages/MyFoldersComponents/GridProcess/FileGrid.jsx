import React, { useState, useEffect } from "react";
import { DataGrid, GridCellModes, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar, Slide } from "@mui/material";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import Box from "@mui/material/Box";
import columns from "../GridColumns/columns";
import axios from "axios";
import NoRows from "./DataGridNoRows.jsx/NoRows";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ContextMenu from "./ContextMenu/ContextMenu";
import ImagePopup from "../ShowContent/Popups/ImagePopup";
import PdfPopup from "../ShowContent/Popups/PdfPopup";
import VideoPopup from "../ShowContent/Popups/VideoPopup";
import Path from "../Path/Path";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { DarkModeSharp, LightModeSharp } from "@mui/icons-material";
import "../../../styles/popup.css";
import RenameFolderPage from "../FolderProcess/RenameFolder";
import RenameFilePage from "../FileProcess/RenameFile";

const customTheme = createTheme({
  palette: {
    mode: "dark", // Koyu tema modunu aktifleştirin
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212", // Arka plan rengini koyu yapın
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #121212;
        }
      `,
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
        },
      },
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
const customTheme2 = createTheme({
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
  handleRowDoubleClick,
  handleRightClick: CellClick,
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
  setIsEditable,
  isEditable,
  clearSuccessMessage,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "dark");
  const [enterEditMode, setEnterEditMode] = useState(null);
  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
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
  useEffect(() => {
    if (successMessage && !openAlert) {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
        setSuccessMessage("");
      }, 2000);
    }
  }, [successMessage, openAlert]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };
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
        <Snackbar
          open={openAlert}
          autoHideDuration={null}
          TransitionComponent={Slide}
          TransitionProps={{
            direction: "right",
          }}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
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
              />
            </div>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
};

export default FileGrid;
