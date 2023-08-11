import React, { useState, useEffect } from "react";
import FileGrid from "./MyFoldersComponents/GridProcess/FileGrid";
import useFetchAllFolders from "./MyFoldersComponents/FetchProcess/useFetchAllFolders";
import { useFetchFolders } from "./MyFoldersComponents/FetchProcess/useFetchFolders";
import { useFetchSubFolders } from "./MyFoldersComponents/FetchProcess/useFetchSubFolders";
import { useFetchFiles } from "./MyFoldersComponents/FetchProcess/useFetchFiles";
import { useFetchFoldersByID } from "./MyFoldersComponents/FetchProcess/useFetchFoldersByID";

const MyFolders = ({ userID, token }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const foldersAll = useFetchAllFolders({ token });
  const [folders, setFolders] = useState([]);
  const [subFolders, setSubFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderPath, setFolderPath] = useState([]);
  const [folderPathId, setFolderPathId] = useState([]);
  const [folderIdforMenu, setfolderIdForMenu] = useState();
  const [folderNameforMenu, setfolderNameforMenu] = useState();
  const [selectedpath, setPath] = useState();
  const [downloadType, setDownloadType] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [selectedFilesforDelete, setSelectedFilesForDelete] = useState([]);

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
    await useFetchFolders(token, userID, setFolders);
  };
  const fetchSubFolders = async () => {
    if (selectedFolder) {
      useFetchSubFolders(token, selectedFolder.folderID, setSubFolders);
    } else {
      setSubFolders([]);
    }
  };

  const fetchFiles = async () => {
    if (selectedFolder) {
      useFetchFiles(token, selectedFolder.folderID, setFiles);
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
    console.log(selectedFilesforDelete);
  };
  const handleRowDoubleClick = async (params) => {
    const folderId = params.id;
    const folder = foldersAll.find((folder) => folder.id === folderId);
    if (folder) {
      setSelectedFolder(folder);
      setFolderPath((prevPath) => [...prevPath, folder.folderName]);
      setFolderPathId((prevPath) => [...prevPath, folder.folderID]);
    } else {
      useFetchFoldersByID(
        token,
        folderId,
        setSelectedFolder,
        setFolderPath,
        setFolderPathId
      );
    }
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
            rows={[...subFolders, ...files]}
            handleRowDoubleClick={handleRowDoubleClick}
            handleRightClick={CellClick}
            parentFolderID={selectedFolder.folderID}
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
            setSelectedFilesForDelete={setSelectedFilesForDelete}
            selectedFilesforDelete={selectedFilesforDelete}
          />
        </>
      ) : (
        <div />
      )}
    </div>
  );
};
export default MyFolders;
