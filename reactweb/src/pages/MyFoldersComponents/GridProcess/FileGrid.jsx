import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import ButtonsComponent from "../Buttons/ButtonsComponent";
import columns from "../GridColumns/columns";
import axios from "axios";
import handleUploadFile from "../FileProcess/UploadFile";

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
  // successMessage,
  idd,
  selectedFolderName,
  selectedpath,
  downloadType,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
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
      setTimeout(function () {
        window.location.reload();
      }, 500);
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
      />
      {renderProgressText(uploadProgress, "File Uploading...")}

      {successMessage && (
        <div style={{ color: "green", fontWeight: "bold" }}>
          {successMessage}
        </div>
      )}
      <div style={{ height: 560, width: "100%" }} ref={drop}>
        <DataGrid
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 100 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          {...rows}
          initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          rowHeight={61}
          pageSize={5}
          density="compact"
          onRowDoubleClick={handleRowClick}
          onRowClick={handleRightClick}
          onCellEditStop={handleEditCellChange}
        />
      </div>
    </div>
  );
};

export default FileGrid;
