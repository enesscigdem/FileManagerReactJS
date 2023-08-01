import React, { useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ButtonsComponent from "./ButtonsComponent";
import columns from "./columns";

const FolderGrid = ({
  userID,
  token,
  folders,
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
  return (
    <div>
      {/* <h3>{currentPath}</h3> */}
      <ButtonsComponent
        type="folder"
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
      <style>
        {`
            .boldHeader .MuiDataGrid-columnHeaderTitle {
              font-weight: bold;
            }
          `}
      </style>
      <div style={{ height: 620, width: "100%" }}>
        <DataGrid
          editable
          columns={columns}
          rows={folders}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 100 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          {...folders}
          initialState={{
            ...folders.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          onRowDoubleClick={handleRowClick}
          onRowClick={handleRightClick}
          onCellEditStop={handleEditCellChange}
        />
      </div>
    </div>
  );
};
export default FolderGrid;
