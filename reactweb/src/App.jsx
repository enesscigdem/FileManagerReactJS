import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SidebarComponent from "./components/SidebarComponent";
import ResetPassword from "./components/ResetPassword";
import Alert from "@mui/material/Alert";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 dakika

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  const checkSession = () => {
    const lastActivity = localStorage.getItem("lastActivity");
    const currentTime = new Date().getTime();
    if (currentTime - lastActivity > SESSION_TIMEOUT) {
      handleLogout();
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");

    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);

    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const hasPageLoaded = localStorage.getItem("hasPageLoaded");
    if (!hasPageLoaded) {
      localStorage.setItem("hasPageLoaded", "true");
      localStorage.setItem("lastActivity", new Date().getTime().toString());
    }
    if (isLoggedIn) checkSession();

    const sessionInterval = setInterval(checkSession, 15100);
    return () => clearInterval(sessionInterval);
  }, []);

  const handleLoginSuccess = (userID, giveToken) => {
    setIsLoggedIn(true);
    setUserID(userID);
    setToken(giveToken);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userID", userID);
    localStorage.setItem("token", giveToken);
    localStorage.setItem("lastActivity", new Date().getTime().toString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID(null);
    setToken(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    localStorage.removeItem("lastActivity");
  };

  return (
    <>
      <BrowserRouter>
        <div>
          {isLoggedIn && (
            <SidebarComponent
              onLogout={handleLogout}
              userID={userID}
              token={token}
            />
          )}
          <Routes>
            {isLoggedIn ? (
              <Route
                path="/"
                element={
                  <Navigate to="/myFolders" token={token} userID={userID} />
                }
              />
            ) : (
              <Route
                path="/"
                element={
                  <Login
                    onLoginSuccess={handleLoginSuccess}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
            )}

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
