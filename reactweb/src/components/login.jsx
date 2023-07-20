import React, { useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import "./login.css";

function Login() {
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
      setIsSubmitted(true);
    } catch (error) {
      setLoginError("Kullanıcı adı veya şifre hatalı!");
    }
  };
  const renderForm = (
    <div className="form">
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <input type="submit" value="Login" />
        </div>
      </form>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </div>
  );

  return (
    <div className="app-login">
      <div className="login-form">
        <div className="title">File Orbis</div>
        {isSubmitted ? <UserTable /> : renderForm}
      </div>
    </div>
  );
}

export default Login;
