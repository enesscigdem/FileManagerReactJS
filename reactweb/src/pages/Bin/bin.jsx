import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { FolderDeleteOutlined } from "@mui/icons-material";
import useFetchAllFolders from "../MyFoldersComponents/FetchProcess/useFetchAllFolders";
const Bin = ({ userID, token }) => {
  const foldersAll = useFetchAllFolders({ token });

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "First name", width: 200 },
    { field: "path", headerName: "Last name", width: 200 },
    {
      field: "creationDate",
      headerName: "creationDate",
      type: "number",
      width: 200,
    },
    {
      field: "size",
      headerName: "size",
      description: "This column has a value getter and is not sortable.",
      width: 160,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <FolderDeleteOutlined style={{ marginRight: "0.5rem" }} />
        <Typography variant="overline">Geri Dönüşüm Kutusu</Typography>
      </div>

      <DataGrid
        rows={[...foldersAll]}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
export default Bin;
