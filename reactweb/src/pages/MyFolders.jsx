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

const useFetchFolders = (userID, token) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `https://localhost:7104/api/Folder/GetFoldersByUserID/${userID}`,
          config
        );

        const foldersWithIds = response.data.map((folder) => ({
          ...folder,
          id: folder.folderID,
          name: folder.folderName,
          type: "folder",
        }));

        setFolders(foldersWithIds);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    if (userID) {
      fetchFolders();
    }
  }, [userID, token]);

  return folders;
};
const useFetchFiles = (folderID, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (folderID) {
      axios
        .get(
          `https://localhost:7104/api/File/GetFilesByFolderID/${folderID}`,
          config
        )
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
    } else {
      // If folderID is null or undefined, reset the files state to an empty array.
      setFiles([]);
    }
  }, [folderID, token]);

  return files;
};
const useFetchSubFolders = (folderID, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [subFolders, setSubFolders] = useState([]);

  useEffect(() => {
    if (folderID) {
      axios
        .get(
          `https://localhost:7104/api/Folder/GetFoldersByParentFolderID/${folderID}`,
          config
        )
        .then((response) => {
          const subFoldersWithIds = response.data.map((folder) => ({
            ...folder,
            id: folder.folderID,
            name: folder.folderName,
            type: "folder",
          }));
          setSubFolders(subFoldersWithIds);
        })
        .catch((error) => {
          console.error("Error fetching subfolders:", error);
        });
    } else {
      setSubFolders([]);
    }
  }, [folderID, token]);

  return subFolders;
};
const ButtonsComponent = ({ type }) => {
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
        {type === "folder" ? (
          <></>
        ) : (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => window.location.reload()}
          >
            Ana Sayfa
          </Button>
        )}
      </Stack>
      <style>
        {`
          .boldHeader .MuiDataGrid-columnHeaderTitle {
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
};

const FolderGrid = ({ folders, handleRowClick }) => {
  return (
    <div>
      <ButtonsComponent type="folder" />
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
  if (!folderID || !folderName) {
    return null;
  }
  return (
    <div>
      <h3>{folderName} Klasörü </h3>
      <h3>Klasör ID : {folderID}</h3>
      <ButtonsComponent type="file" />
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
const MyFolders = ({ userID, token }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const folders = useFetchFolders(userID, token);
  const subFolders = useFetchSubFolders(selectedFolder?.folderID, token);
  const files = useFetchFiles(selectedFolder?.folderID, token);

  useEffect(() => {
    // Check if the page has not been loaded before
    const hasPageLoaded = localStorage.getItem("hasPageLoaded");

    if (!hasPageLoaded) {
      localStorage.setItem("hasPageLoaded", true);
      window.location.reload();
    }
  }, []);

  const handleRowClick = async (params) => {
    const folderId = params.id;
    const folder = folders.find((folder) => folder.id === folderId);
    if (folder) {
      setSelectedFolder(folder);
    } else {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(
          `https://localhost:7104/api/Folder/GetFolderByID/${folderId}`,
          config
        );

        const subfolder = {
          ...response.data,
          id: response.data.folderID,
          name: response.data.folderName,
          type: "folder",
        };

        setSelectedFolder(subfolder);
      } catch (error) {
        console.error("Error fetching subfolder:", error);
      }
    }
  };
  return (
    <div>
      {selectedFolder ? (
        <>
          <FileGrid
            folderID={selectedFolder.folderID}
            folderName={selectedFolder.folderName}
            rows={[...subFolders, ...files]}
          />
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => setSelectedFolder(null)}
          >
            Back
          </Button>
        </>
      ) : (
        <FolderGrid folders={folders} handleRowClick={handleRowClick} />
      )}
    </div>
  );
};

export default MyFolders;
