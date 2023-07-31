import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const defaultTheme = createTheme();

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassError, setResetPassError] = useState(null);

  const location = useLocation(); // Use useLocation to access query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetPassError(null);

    if (newPassword !== confirmPassword) {
      setResetPassError("Passwords do not match.");
      return;
    }

    try {
      debugger;
      const response = await axios.post(
        "https://localhost:7104/api/User/ResetPassword",
        {
          username: "enescigdem",
          email: "enes_izmir18@hotmail.com",
          newPassword: newPassword,
          resetToken: token,
        }
      );
      console.log(response.data);
      setResetPassError("Password reset successful");
    } catch (error) {
      setResetPassError("An error occurred while resetting the password.");
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ minWidth: 500, marginTop: 8 }}>
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Reset Password
              </Typography>
              <Box component="form" noValidate onSubmit={handleResetPassword}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  autoComplete="newPassword"
                  autoFocus
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
                {resetPassError && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "error" }}
                  >
                    {resetPassError}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResetPassword;
