import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Folder as FolderIcon,
  Description as FileIcon,
} from "@mui/icons-material";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const columns = [
  {
    field: "name",
    headerName: "Dosya Adı",
    width: 200,
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
];

const Comment = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:7104/api/Folder/GetAllFolders")
      .then((response) => {
        const foldersWithIds = response.data.map((folder, index) => ({
          ...folder,
          id: index + 1,
          name: folder.folderName,
          type: "folder",
        }));
        setFolders(foldersWithIds);
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
  }, []);

  const handleRowClick = (params) => {
    const folderId = params.id;
    const folder = folders.find((folder) => folder.id === folderId);
    setSelectedFolder(folder);
  };

  return (
    <div>
      {selectedFolder ? (
        <FolderDetails folder={selectedFolder} />
      ) : (
        <Home handleRowClick={handleRowClick} folders={folders} />
      )}
    </div>
  );
};
const Home = ({ handleRowClick, folders }) => {
  return (
    <>
      <Stack
        marginTop={2}
        marginBottom={2}
        spacing={2}
        height={60}
        direction="row"
        alignItems="center"
      >
        <Button size="small" color="success" variant="contained">
          Klasör Oluştur
        </Button>
        <Button size="small" color="primary" variant="contained">
          Dosya Yükle
        </Button>
        <Button size="small" color="warning" variant="contained">
          Klasör Yükle
        </Button>
      </Stack>
      <style>
        {`
          .boldHeader .MuiDataGrid-columnHeaderTitle {
            font-weight: bold;
          }
        `}
      </style>
      <div style={{ height: 620, width: "100%" }}>
        <DataGrid
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 100 },
            },
          }}
          slots={{ toolabar: GridToolbar }}
          rows={folders}
          columns={columns}
          {...folders}
          initialState={{
            ...folders.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
};
const FolderDetails = ({ folder }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7104/api/File/GetAllFiles")
      .then((response) => {
        const filesWithIds = response.data.map((file, index) => ({
          ...file,
          id: index + 1,
        }));
        setFiles(filesWithIds);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

  const rows = files.map((file) => ({
    id: file.id,
    name: file.fileName,
    type: "file",
  }));

  return (
    <div>
      <h2>{folder.folderName} Klasörü</h2>
      <div style={{ height: 620, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
      <button onClick={() => window.location.reload()}>Ana Sayfa</button>
    </div>
  );
};

export default Comment;
