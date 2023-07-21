import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const FolderList = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7104/api/Folder/GetAllFolders"
        );
        const folderWithIds = response.data.map((folder) => ({
          ...folder,
          id: folder.folderID,
        }));
        setFolders(folderWithIds);
      } catch (error) {
        console.error("Error fetching folders : ", error);
      }
    };
    fetchFolders();
  }, []);

  const columns = [
    {
      field: "folderID",
      headerName: "Folder ID",
      width: 150,
      headerClassName: "boldHeader",
    },
    {
      field: "folderName",
      headerName: "Folder Name",
      width: 300,
      headerClassName: "boldHeader",
    },
    {
      field: "folderPath",
      headerName: "Folder Path",
      width: 600,
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
          slots={{ toolbar: GridToolbar }}
          rows={folders}
          columns={columns}
          {...folders}
          initialState={{
            ...folders.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>
    </>
  );
};

export default FolderList;
