import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetchFolders from "./MyFoldersComponents/useFetchFolders";
import useFetchFiles from "./MyFoldersComponents/useFetchFiles";
import useFetchSubFolders from "./MyFoldersComponents/useFetchSubFolders";
import FolderGrid from "./MyFoldersComponents/FolderGrid";
import FileGrid from "./MyFoldersComponents/FileGrid";

const MyFolders = ({ userID, token }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const folders = useFetchFolders({ userID, token });
  const subFolders = useFetchSubFolders(selectedFolder?.folderID, token);
  const files = useFetchFiles(selectedFolder?.folderID, token);
  const [successMessage, setSuccessMessage] = useState("");
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
        console.log(selectedFolder);
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
      handleRenameFolder(id, newValue);
    }
  };
  const handleRenameFolder = async (folderID, folderName) => {
    debugger;
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put(
        "https://localhost:7104/api/Folder/RenameFolder",
        {
          folderID: folderID,
          folderName: folderName,
          path: " ",
        },
        config
      );
      setSuccessMessage("Klasör ismi başarıyla güncellendi!");
      window.location.reload();
    } catch (error) {
      setSuccessMessage("Klasör ismi güncellenirken bir hata oluştu!");
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
            handleEditCellChange={handleEditCellChange}
            successMessage={successMessage}
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
        />
      )}
    </div>
  );
};

export default MyFolders;
