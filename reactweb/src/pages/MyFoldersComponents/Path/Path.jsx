import React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { FolderOpenOutlined } from "@mui/icons-material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Path = () => (
  <div role="presentation" onClick={handleClick}>
    <Breadcrumbs sx={{ marginBottom: 2 }} aria-label="breadcrumb">
      <StyledBreadcrumb
        sx={{ cursor: "pointer" }}
        component="a"
        onClick={() => window.location.reload()}
        label="Home"
        icon={<HomeIcon fontSize="small" />}
      />
      <StyledBreadcrumb
        component="a"
        href="#"
        icon={<FolderOpenOutlined fontSize="small" />}
        label="Test1"
        sx={{ cursor: "pointer" }}
      />
      <StyledBreadcrumb
        component="a"
        href="#"
        icon={<FolderOpenOutlined fontSize="small" />}
        label="Test2"
        sx={{ cursor: "pointer" }}
      />
      <StyledBreadcrumb
        component="a"
        href="#"
        icon={<FolderOpenOutlined fontSize="small" />}
        label="Test3"
        sx={{ cursor: "pointer" }}
      />
    </Breadcrumbs>
  </div>
);
export default Path;
