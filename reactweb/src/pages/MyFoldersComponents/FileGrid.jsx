import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ButtonsComponent from "./ButtonsComponent";
import columns from "./columns";

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
  successMessage,
  idd,
  selectedFolderName,
  selectedpath,
  downloadType,
}) => {
  if (!folderID || !folderName) {
    return null;
  }
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
      {successMessage && (
        <div style={{ color: "green", fontWeight: "bold" }}>
          {successMessage}
        </div>
      )}
      <div style={{ height: 560, width: "100%" }}>
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
