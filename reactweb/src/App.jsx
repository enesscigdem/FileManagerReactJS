import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SidebarComponent from "./components/SidebarComponent";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");

    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);

    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleLoginSuccess = (userID, giveToken) => {
    setIsLoggedIn(true);
    setUserID(userID);
    setToken(token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userID", userID);
    localStorage.setItem("token", giveToken);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID(null);
    setToken(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    localStorage.removeItem("hasPageLoaded");
  };

  return (
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
  );
};
export default App;
