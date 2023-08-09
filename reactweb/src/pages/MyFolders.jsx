import React, { useState, useEffect } from "react";
import axios from "axios";
import FileGrid from "./MyFoldersComponents/GridProcess/FileGrid";
import RenameFolderPage from "./MyFoldersComponents/FolderProcess/RenameFolder";
import RenameFilePage from "./MyFoldersComponents/FileProcess/RenameFile";
import useFetchAllFolders from "./MyFoldersComponents/FetchProcess/useFetchAllFolders";

const MyFolders = ({ userID, token }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const foldersAll = useFetchAllFolders({ token });
  const [folders, setFolders] = useState([]);
  const [subFolders, setSubFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [folderPath, setFolderPath] = useState([]);
  const [folderPathId, setFolderPathId] = useState([]);
  const [folderIdforMenu, setfolderIdForMenu] = useState();
  const [folderNameforMenu, setfolderNameforMenu] = useState();
  const [selectedpath, setPath] = useState();
  const [downloadType, setDownloadType] = useState();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const hasPageLoaded = localStorage.getItem("hasPageLoaded");

    if (!hasPageLoaded) {
      localStorage.setItem("hasPageLoaded", true);
      window.location.reload();
    } else {
      if (folders.length > 0) {
        setSelectedFolder(folders[0]);
        console.log(folders[0]);
      }
    }
  }, [folders]);
  useEffect(() => {
    fetchFolders();
  }, [userID, token]);
  useEffect(() => {
    fetchSubFolders();
    fetchFiles();
  }, [selectedFolder]);

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
  const fetchSubFolders = async () => {
    if (selectedFolder) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(
          `https://localhost:7104/api/Folder/GetFoldersByParentFolderID/${selectedFolder.folderID}`,
          config
        );

        const subFoldersWithIds = response.data.map((folder) => ({
          ...folder,
          id: folder.folderID,
          name: folder.folderName,
          type: "folder",
        }));
        setSubFolders(subFoldersWithIds);
      } catch (error) {
        console.error("Error fetching subfolders:", error);
      }
    } else {
      setSubFolders([]);
    }
  };

  const fetchFiles = async () => {
    if (selectedFolder) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(
          `https://localhost:7104/api/File/GetFilesByFolderID/${selectedFolder.folderID}`,
          config
        );

        const filesWithIds = response.data.map((file) => ({
          ...file,
          id: file.fileID,
          name: file.fileName,
          type: "file",
        }));
        setFiles(filesWithIds);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    } else {
      setFiles([]);
    }
  };

  const CellClick = async (params) => {
    const folderIdforMenu = params.id;
    const folderNameforMenu = params.row.name;
    const selectedpath = params.row.path;
    const selectedType = params.row.type;
    console.log(
      folderIdforMenu,
      folderNameforMenu,
      params.row.type,
      selectedpath,
      selectedType
    );
    setfolderIdForMenu(folderIdforMenu);
    setfolderNameforMenu(folderNameforMenu);
    setPath(selectedpath);
    setDownloadType(selectedType);
  };
  const handleRowDoubleClick = async (params) => {
    const folderId = params.id;
    const folder = foldersAll.find((folder) => folder.id === folderId);
    if (folder) {
      setSelectedFolder(folder);
      setFolderPath((prevPath) => [...prevPath, folder.folderName]);
      setFolderPathId((prevPath) => [...prevPath, folder.folderID]);
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
        setFolderPath((prevPath) => [...prevPath, subfolder.name]);
        setFolderPathId((prevPath) => [...prevPath, subfolder.folderID]);
      } catch (error) {
        console.error("Error fetching subfolder:", error);
      }
    }
  };
  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };

  const handleFolderPathChange = (newPath) => {
    setFolderPath(newPath);
  };

  const handleFolderClick = (folderId) => {
    debugger;
    const selectedFolder2 = foldersAll.find((folder) => folder.id === folderId);
    setSelectedFolder(selectedFolder2);
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
            handleRowDoubleClick={handleRowDoubleClick}
            handleRightClick={CellClick}
            currentPath={folderPath.join(" -> ")}
            parentFolderID={selectedFolder.folderID}
            successMessage={successMessage}
            idd={folderIdforMenu}
            selectedFolderName={folderNameforMenu}
            selectedpath={selectedpath}
            downloadType={downloadType}
            folderPath={folderPath}
            folderPathId={folderPathId}
            setFolderPath={handleFolderPathChange}
            onFolderClick={handleFolderClick}
            fetchFiles={fetchFiles}
            fetchSubFolders={fetchSubFolders}
            setIsEditable={setIsEditable}
            isEditable={isEditable}
            clearSuccessMessage={clearSuccessMessage}
          />
        </>
      ) : (
        <div />
      )}
    </div>
  );
};
export default MyFolders;
