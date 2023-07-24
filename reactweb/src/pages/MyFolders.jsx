import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Folder as FolderIcon,
  Description as FileIcon,
} from "@mui/icons-material";
import axios, { AxiosHeaders } from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const columns = [
  {
    field: "folderID",
    headerName: "Folder ID",
    width: 150,
    headerClassName: "boldHeader",
  },
  {
    field: "name",
    headerName: "Folder Name",
    width: 400,
    headerClassName: "boldHeader",
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
    field: "folderPath",
    headerName: "Folder Path",
    width: 400,
    headerClassName: "boldHeader",
  },
  {
    field: "folderCreatedDate",
    headerName: "Created Date",
    width: 250,
    headerClassName: "boldHeader",
  },
  {
    field: "userID",
    headerName: "User ID",
    width: 150,
    headerClassName: "boldHeader",
  },
];

const columnsFile = [
  {
    field: "fileID",
    headerName: "File ID",
    width: 150,
    headerClassName: "boldHeader",
  },
  {
    field: "name",
    headerName: "File Name",
    width: 350,
    headerClassName: "boldHeader",
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
    field: "filePath",
    headerName: "File Path",
    width: 400,
    headerClassName: "boldHeader",
  },
  {
    field: "fileSize",
    headerName: "File Size",
    width: 150,
    headerClassName: "boldHeader",
  },
  {
    field: "fileCreationDate",
    headerName: "Created Date",
    width: 250,
    headerClassName: "boldHeader",
  },
  {
    field: "folderID",
    headerName: "Folder ID",
    width: 150,
    headerClassName: "boldHeader",
  },
];
const useFetchFolders = (userID) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    debugger;
    axios
      .get(`https://localhost:7104/api/Folder/GetFoldersByUserID/${userID}`)
      .then((response) => {
        const foldersWithIds = response.data.map((folder) => ({
          ...folder,
          id: folder.folderID,
          name: folder.folderName,
          type: "folder",
        }));
        setFolders(foldersWithIds);
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
  }, [userID]);

  return folders;
};
const useFetchFiles = (folderID) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7104/api/File/GetFilesByFolderID/${folderID}`)
      .then((response) => {
        const filesWithIds = response.data.map((file) => ({
          ...file,
          id: file.fileID,
          name: file.fileName,
          type: "file",
        }));
        setFiles(filesWithIds);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, [folderID]);

  return files;
};

const FolderGrid = ({ folders, handleRowClick }) => {
  return (
    <div>
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
          slots={{ toolbar: GridToolbar }}
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
    </div>
  );
};

const FileGrid = ({ folderName, rows, folderID }) => {
  return (
    <div>
      <h3>{folderName} Klasörü </h3>
      <h3>Klasör ID : {folderID}</h3>
      <Stack
        marginTop={2}
        marginBottom={2}
        spacing={2}
        height={60}
        direction="row"
        alignItems="center"
      >
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => window.location.reload()}
        >
          Ana Sayfa
        </Button>
      </Stack>
      <style>
        {`
          .boldHeader .MuiDataGrid-columnHeaderTitle {
            font-weight: bold;
          }
        `}
      </style>
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
          columns={columnsFile}
          {...rows}
          initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          pageSize={5}
        />
      </div>
    </div>
  );
};

const MyFolders = ({ userID }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const folders = useFetchFolders(userID);
  const files = useFetchFiles(selectedFolder?.folderID);

  const handleRowClick = (params) => {
    const folderId = params.id;
    const folder = folders.find((folder) => folder.id === folderId);
    setSelectedFolder(folder);
  };

  return (
    <div>
      {selectedFolder ? (
        <FileGrid
          folderID={selectedFolder.folderID}
          folderName={selectedFolder.folderName}
          rows={files}
        />
      ) : (
        <FolderGrid folders={folders} handleRowClick={handleRowClick} />
      )}
    </div>
  );
};

export default MyFolders;
