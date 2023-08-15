import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import MyFolders from "../pages/MyFolders.jsx";
import Bin from "../pages/Bin/bin";
import "../styles/sidebarcomponent.css";
function SidebarComponent({ onLogout, userID, token }) {
  return (
    <Sidebar onLogout={onLogout} userID={userID} token={token}>
      <Routes>
        <Route
          path="/myFolders"
          element={<MyFolders userID={userID} token={token} />}
        />
        <Route path="/bin" element={<Bin userID={userID} token={token} />} />
      </Routes>
    </Sidebar>
  );
}

export default SidebarComponent;
