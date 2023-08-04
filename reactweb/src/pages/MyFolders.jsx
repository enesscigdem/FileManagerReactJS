import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetchFolders from "./MyFoldersComponents/FetchProcess/useFetchFolders";
import useFetchFiles from "./MyFoldersComponents/FetchProcess/useFetchFiles";
import useFetchSubFolders from "./MyFoldersComponents/FetchProcess/useFetchSubFolders";
import FolderGrid from "./MyFoldersComponents/GridProcess/FolderGrid";
import FileGrid from "./MyFoldersComponents/GridProcess/FileGrid";
import RenameFolderPage from "./MyFoldersComponents/FolderProcess/RenameFolder";
import RenameFilePage from "./MyFoldersComponents/FileProcess/RenameFile";
import useFetchAllFolders from "./MyFoldersComponents/FetchProcess/useFetchAllFolders";

const MyFolders = ({ userID, token }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const foldersAll = useFetchAllFolders({ token });
  const folders = useFetchFolders({ userID, token });
  const subFolders = useFetchSubFolders(selectedFolder?.folderID, token);
  const files = useFetchFiles(selectedFolder?.folderID, token);
  const [successMessage, setSuccessMessage] = useState("");
  const [folderPath, setFolderPath] = useState([]);
  const [folderPathId, setFolderPathId] = useState([]);
  const [folderIdforMenu, setfolderIdForMenu] = useState();
  const [folderNameforMenu, setfolderNameforMenu] = useState();
  const [selectedpath, setPath] = useState();
  const [downloadType, setDownloadType] = useState();

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
  const handleRightClick = async (params) => {
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
  const handleRowClick = async (params) => {
    const folderId = params.id;
    const folder = folders.find((folder) => folder.id === folderId);
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

  const handleEditCellChange = async (params, event) => {
    debugger;
    const { id, field } = params;
    const newValue = event.target.value;
    if (field === "name") {
      if (params.row.type === "folder") handleRenameFolder(id, newValue);
      else handleRenameFile(id, newValue);
    }
  };
  const handleRenameFolder = async (folderID, folderName) => {
    try {
      await RenameFolderPage(folderID, folderName, token);
      setSuccessMessage("Folder name successfully updated!");

      const updatedFolder = foldersAll.find(
        (folder) => folder.id === selectedFolder.folderID
      );
      if (updatedFolder.parentFolderID === null) {
        debugger;
        setTimeout(function () {
          window.location.reload();
        }, 250);
      } else {
        debugger;
        setSelectedFolder(updatedFolder);
      }
    } catch (error) {
      console.error("Error renaming folder:", error);
      setSuccessMessage("An error occurred while updating the folder name!");
    }
  };

  const handleRenameFile = async (fileID, fileName) => {
    setSuccessMessage(await RenameFilePage(fileID, fileName, token));
    setTimeout(function () {
      window.location.reload();
    }, 100);
  };
  const handleFolderPathChange = (newPath) => {
    setFolderPath(newPath);
  };

  const handleFolderClick = (folderId) => {
    const selectedFolder2 = foldersAll.find((folder) => folder.id === folderId);
    setSelectedFolder(selectedFolder2);
  };

  return (
    <div>
      {successMessage && (
        <div
          style={{
            color: "green",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {successMessage}
        </div>
      )}

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
            handleEditCellChange={handleEditCellChange}
            successMessage={successMessage}
            idd={folderIdforMenu}
            selectedFolderName={folderNameforMenu}
            selectedpath={selectedpath}
            downloadType={downloadType}
            folderPath={folderPath}
            folderPathId={folderPathId}
            setFolderPath={handleFolderPathChange}
            onFolderClick={handleFolderClick}
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
          handleEditCellChange={handleEditCellChange}
          successMessage={successMessage}
          selectedFolderName={folderNameforMenu}
          selectedpath={selectedpath}
          downloadType={downloadType}
          folderPath={folderPath}
          folderPathId={folderPathId}
          setFolderPath={handleFolderPathChange}
          onFolderClick={handleFolderClick}
        />
      )}
    </div>
  );
};
export default MyFolders;
