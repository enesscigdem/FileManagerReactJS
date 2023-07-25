import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SidebarComponent from "./components/SidebarComponent";

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
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userID", userID);
    localStorage.setItem("token", giveToken);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
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
          <Route
            path="/"
            element={
              <Login
                onLoginSuccess={handleLoginSuccess}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
