import { Margin } from "@mui/icons-material";
import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaSignOutAlt,
  FaList,
  FaUserCircle,
  FaFolder,
  FaFolderMinus,
  FaFolderOpen,
  FaRegFolder,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children, onLogout, userID, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/myFolders",
      name: "My Folders",
      icon: <FaFolderOpen />,
    },
    {
      path: "/",
      name: "All Folder List",
      icon: <FaRegFolder />,
    },
    {
      path: "/userlist",
      name: "User List",
      icon: <FaUserCircle />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },

    {
      path: "/product",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/productList",
      name: "Product List",
      icon: <FaThList />,
    },
  ];

  return (
    <>
      <div className="container">
        <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  color: "Highlight",
                  fontFamily: "sans-serif",
                  marginBottom: "10px",
                }}
              >
                Hoşgeldiniz,{userID}
              </p>
              <img
                src="https://www.fileorbis.com/assets/images/logo.svg"
                alt=""
              />
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
          <div className="link" activeClassName="active">
            <div className="icon">
              <FaSignOutAlt cursor={"pointer"} onClick={onLogout} />
            </div>
            <div
              style={{
                display: isOpen ? "block" : "none",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={onLogout}
            >
              Çıkış Yap
            </div>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
