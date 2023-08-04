import React, { useState, useEffect } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { FolderOpenOutlined } from "@mui/icons-material/";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
const Path = ({ folderPath, folderPathId, setFolderPath, onFolderClick }) => {
  const handleClick = (event, index) => {
    event.preventDefault();
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
    const selectedFolderId = folderPathId[index];
    onFolderClick(selectedFolderId);
  };

  return (
    <div role="presentation">
      <Breadcrumbs sx={{ marginBottom: 2 }} aria-label="breadcrumb">
        <StyledBreadcrumb
          sx={{ cursor: "pointer" }}
          component="a"
          onClick={() => window.location.reload()}
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        {folderPath.map((folderName, index) => (
          <StyledBreadcrumb
            key={index}
            component="a"
            href="#"
            icon={<FolderOpenOutlined fontSize="small" />}
            label={folderName}
            sx={{ cursor: "pointer" }}
            onClick={(event) => handleClick(event, index)}
          />
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default Path;
