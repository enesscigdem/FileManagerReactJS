import React, { useState, useEffect, useRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Folder as FolderIcon,
  Description as FileIcon,
} from "@mui/icons-material";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
        {params.editing ? (
          <input
            autoFocus
            value={params.row.name}
            onChange={(e) =>
              params.props.onEditCellChange({
                id: params.id,
                field: "name",
                props: params.props,
                value: e.target.value,
              })
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                params.props.onEditCellChange({
                  id: params.id,
                  field: "name",
                  props: params.props,
                  value: e.target.value,
                });
              }
            }}
          />
        ) : (
          <div onDoubleClick={() => params.setEditCellProps({ field: "name" })}>
            {params.value}
          </div>
        )}
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
  {
    field: "fileID",
    headerName: "File ID",
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

const ButtonsComponent = ({ type, userID, token, parentFolderID }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const handleCreateFolder = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post(
        "https://localhost:7104/api/Folder/CreateFolder",
        {
          folderName: "New Folder",
          folderPath: "dsdsdssdds",
          userID,
          parentFolderID,
        },
        config
      );
      setSuccessMessage("Klasör başarıyla oluşturuldu!");
      window.location.reload();
    } catch (error) {
      setSuccessMessage("Klasör oluşturulurken bir hata oluştu!");
      console.error("Error creating folder:", error);
    }
  };

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
        <Button
          size="small"
          color="success"
          variant="contained"
          onClick={handleCreateFolder}
        >
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
    </>
  );
};

const FolderGrid = ({
  userID,
  token,
  folders,
  handleRowClick,
  handleRightClick,
  currentPath,
  parentFolderID,
  idd,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renamingFolderId, setRenamingFolderId] = useState(null);
  const [renamingFolderName, setRenamingFolderName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [contextMenuProps, setContextMenuProps] = useState(null);
  const handleContextMenu = (event, folderID, folderName) => {
    event.preventDefault();
    setContextMenuProps({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      folderID,
      folderName,
    });
  };

  const handleClose = () => {
    setContextMenuProps(null);
  };
  const handleRenameFolder = async (folderID, folderName) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put(
        "https://localhost:7104/api/Folder/RenameFolder",
        {
          folderID: folderID,
          folderName: folderName,
          folderPath: " ",
        },
        config
      );

      setIsRenaming(false);
      setRenamingFolderId(null);
      setRenamingFolderName("");
      setSuccessMessage("Klasör başarıyla güncellendi!");
      window.location.reload();
    } catch (error) {
      setSuccessMessage("Klasör güncellenirken bir hata oluştu!");
      console.error("Error renaming folder:", error);
    }
  };
  const handleContextMenuRename = (folderID, folderName) => {
    setRenamingFolderId(folderID);
    setRenamingFolderName(folderName);
    setSuccessMessage("");
  };
  const inputRef = useRef(null);
  useEffect(() => {
    if (isRenaming) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const handleKeyPress = (event, folderID, folderName) => {
    if (event.key === "Enter") {
      handleRenameFolder(folderID, folderName);
    }
  };

  return (
    <div>
      <h3>{currentPath}</h3>
      <ButtonsComponent
        type="folder"
        userID={userID}
        token={token}
        parentFolderID={parentFolderID}
      />
      {isRenaming && (
        <div>
          <input
            ref={inputRef}
            type="text"
            value={renamingFolderName}
            onChange={(e) => setRenamingFolderName(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, idd, renamingFolderName)} // Handle key press event
          />
          <button onClick={() => handleRenameFolder(idd, renamingFolderName)}>
            Güncelle
          </button>
        </div>
      )}
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
          columns={columns}
          rows={folders}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 100 },
            },
            row: {
              onContextMenu: handleContextMenu,
              style: { cursor: "context-menu" },
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
          onContextMenu={(event) => event.preventDefault()}
          onRowContextMenu={(event, params) =>
            handleContextMenu(event, params.row.id, params.row.name)
          }
        />
      </div>
      {contextMenuProps && (
        <Menu
          open={contextMenuProps !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenuProps !== null
              ? { top: contextMenuProps.mouseY, left: contextMenuProps.mouseX }
              : undefined
          }
          slotProps={{
            root: {
              onContextMenu: (e) => {
                e.preventDefault();
                handleClose();
              },
            },
          }}
        >
          <MenuItem
            style={{ fontSize: "16px" }}
            onClick={() =>
              handleContextMenuRename(
                contextMenuProps.folderID,
                contextMenuProps.folderName
              )
            }
          >
            Rename
          </MenuItem>
          {/* Add other context menu items as needed */}
        </Menu>
      )}
    </div>
  );
};

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
}) => {
  if (!folderID || !folderName) {
    return null;
  }
  return (
    <div>
      {folderName && <h3>{currentPath}</h3>}
      <ButtonsComponent
        type="file"
        userID={userID}
        token={token}
        parentFolderID={parentFolderID}
      />
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
          onRowDoubleClick={handleRowClick}
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
  const [folderPath, setFolderPath] = useState([]);
  const [folderIdforMenu, setfolderIdForMenu] = useState();
  useEffect(() => {
    const hasPageLoaded = localStorage.getItem("hasPageLoaded");

    if (!hasPageLoaded) {
      localStorage.setItem("hasPageLoaded", true);
      window.location.reload();
    }
  }, []);

  const handleRightClick = async (params) => {
    const folderIdforMenu = params.id;
    console.log(folderIdforMenu);
    setfolderIdForMenu(folderIdforMenu);
  };
  const handleRowClick = async (params) => {
    const folderId = params.id;
    const folder = folders.find((folder) => folder.id === folderId);
    if (folder) {
      setSelectedFolder((prevSelectedFolder) => {
        setFolderPath((prevPath) => [
          ...prevPath,
          prevSelectedFolder?.folderName || "",
        ]);
        return folder;
      });
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

        setSelectedFolder((prevSelectedFolder) => {
          setFolderPath((prevPath) => [
            ...prevPath,
            prevSelectedFolder?.folderName || "",
          ]);
          return subfolder;
        });
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
            userID={userID}
            token={token}
            folderID={selectedFolder.folderID}
            folderName={selectedFolder.folderName}
            rows={[...subFolders, ...files]}
            handleRowClick={handleRowClick}
            handleRightClick={handleRightClick}
            currentPath={folderPath.join(" -> ")}
            parentFolderID={selectedFolder.folderID}
          />
        </>
      ) : (
        <FolderGrid
          userID={userID}
          token={token}
          folders={folders}
          handleRowClick={handleRowClick}
          currentPath={folderPath.join(" -> ")}
          parentFolderID={folders.folderID}
          handleRightClick={handleRightClick}
          idd={folderIdforMenu}
        />
      )}
    </div>
  );
};

export default MyFolders;
