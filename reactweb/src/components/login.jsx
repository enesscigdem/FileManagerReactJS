import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import Dashboard from "../pages/Dashboard";

function Login({ onLoginSuccess }) {
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
      setLoginError("Giriş Başarılı");
      setIsSubmitted(true);
      onLoginSuccess();
    } catch (error) {
      setLoginError("Kullanıcı adı veya şifre hatalı!");
    }
  };

  const renderForm = (
    <>
      <div className="app-login">
        <div className="login-form">
          <div className="title">File Orbis</div>
          <div className="form">
            <form onSubmit={handleLogin}>
              <div className="input-container">
                <label>Username </label>
                <input
                  type="text"
                  value={username}
                  placeholder="exampleuser123"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label>Password </label>
                <input
                  type="password"
                  value={password}
                  placeholder="*******"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="button-container">
                <input type="submit" value="Login" />
              </div>
            </form>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          </div>
        </div>
      </div>
    </>
  );

  return <> {isSubmitted ? <Dashboard /> : renderForm}</>;
}

export default Login;
