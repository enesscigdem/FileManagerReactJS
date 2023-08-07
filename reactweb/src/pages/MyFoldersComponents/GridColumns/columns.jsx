import React from "react";
import {
  Folder as FolderIcon,
  Description as FileIcon,
} from "@mui/icons-material";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 400,
    headerClassName: "boldHeader",
    editable: true,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {params.row.type === "folder" ? (
          <FolderIcon style={{ marginRight: 8 }} />
        ) : (
          <FileIcon style={{ marginRight: 8 }} />
        )}
        {params.value}
      </div>
    ),
  },
  {
    field: "path",
    headerName: "Path",
    width: 400,
  },
  {
    field: "creationDate",
    headerName: "Created Date",
    width: 250,
  },
  {
    field: "size",
    headerName: "Size (MB)",
    width: 250,
  },
  // {
  //   field: "userID",
  //   headerName: "User ID",
  //   width: 150,
  // },
  // {
  //   field: "folderID",
  //   headerName: "Folder ID",
  //   width: 150,
  // },
  // {
  //   field: "fileID",
  //   headerName: "File ID",
  //   width: 150,
  // },
];
export default columns;
