import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import ForgotPassword from "./ForgotPassword.jsx";

const Login = ({ onLoginSuccess }) => {
  const defaultTheme = createTheme();

  const [isForgetPass, setIsForgetPass] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const response = await axios.post(
        "https://localhost:7104/api/User/Login",
        {
          username: username,
          password: password,
        }
      );
      console.log(response.data);
      setLoginError("Giriş Başarılı");
      setIsSubmitted(true);
      onLoginSuccess(response.data.userID, response.data.token);
    } catch (error) {
      setLoginError("Kullanıcı adı veya şifre hatalı!");
    }
  };

  return (
    <div>
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
                  onSubmit={handleLogin}
                  noValidate
                  sx={{ mt: 1 }}
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
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/forgot-password" variant="body2">
                        {"Forgot Password"}
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              </CardContent>
            </Card>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;
