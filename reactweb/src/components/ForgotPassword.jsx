import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [resetPassError, setResetPassError] = useState(null);

  const resetPass = async (e) => {
    e.preventDefault();
    setResetPassError("Sending email...");
    try {
      debugger;
      const response = await axios.post(
        "https://localhost:7104/api/User/ForgotPassword",
        {
          username: username,
          email: email,
          resetToken: "",
          NewPassword: "",
        }
      );
      console.log(response.data);
      setResetPassError(
        `An email with instructions has been sent to ${email}. Click the link provided in the email to reset your password.`
      );
    } catch (error) {
      setResetPassError("The username or email is invalid.");
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
              <Typography sx={{ marginRight: 5, textAlign: "center" }}>
                <img
                  src="https://www.fileorbis.com/assets/images/logo.svg"
                  alt="Logo"
                />
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={resetPass}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  type="email"
                  fullWidth
                  id="email"
                  label="E-Mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  SEND EMAIL
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/" variant="body2">
                      Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {resetPassError && (
          <p
            style={{
              color: "Highlight",
              textAlign: "center",
              marginTop: "10",
            }}
          >
            {resetPassError}
          </p>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
