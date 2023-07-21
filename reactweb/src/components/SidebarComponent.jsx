import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Analytics from "../pages/Analytics.jsx";
import Comment from "../pages/Comment.jsx";
import Product from "../pages/Product.jsx";
import ProductList from "../pages/ProductList.jsx";
import "./sidebarcomponent.css";
import UserList from "../pages/UserList.jsx";
import FolderList from "../pages/FolderList.jsx";

function SidebarComponent({ onLogout }) {
  return (
    <Sidebar onLogout={onLogout}>
      <Routes>
        <Route path="/" element={<FolderList />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productList" element={<ProductList />} />
      </Routes>
    </Sidebar>
  );
}

export default SidebarComponent;
