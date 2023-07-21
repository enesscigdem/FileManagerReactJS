import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SidebarComponent from "./components/SidebarComponent";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <BrowserRouter>
      <div>
        {isLoggedIn ? (
          <SidebarComponent onLogout={handleLogout} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
