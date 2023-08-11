import { createTheme } from "@mui/material/styles";
export const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          body {
            background-color: #121212;
          }
        `,
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
        },
      },
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
