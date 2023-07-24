import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SidebarComponent from "./components/SidebarComponent";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");

    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);
  }, []);

  const handleLoginSuccess = (userID) => {
    setIsLoggedIn(true);
    setUserID(userID);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userID", userID);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userID");
  };

  return (
    <BrowserRouter>
      <div>
        {isLoggedIn ? (
          <SidebarComponent onLogout={handleLogout} userID={userID} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
