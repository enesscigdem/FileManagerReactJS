import { createTheme } from "@mui/material/styles";
export const customTheme2 = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#004080",
    },
    secondary: {
      main: "#ff5722",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  shape: {
    borderRadius: 20,
  },
  shadows: ["none"],
});
