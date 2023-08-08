import React, { useState } from "react";
import { FaBars, FaSignOutAlt, FaFolderOpen } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children, onLogout, userID, token }) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggle = () => setIsOpenSideBar(!isOpenSideBar);
  const menuItem = [
    {
      path: "/myFolders",
      name: "My Folders",
      icon: <FaFolderOpen />,
    },
  ];

  return (
    <>
      <div className="container">
        <div
          style={{ width: isOpenSideBar ? "300px" : "50px" }}
          className="sidebar"
        >
          <div className="top_section">
            <h1
              style={{ display: isOpenSideBar ? "block" : "none" }}
              className="logo"
            >
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  color: "Highlight",
                  fontFamily: "sans-serif",
                  marginBottom: "10px",
                }}
              >
                {/* Hoşgeldiniz,{userID} */}
              </p>
              <img
                src="https://www.fileorbis.com/assets/images/logo.svg"
                alt=""
              />
            </h1>
            <div
              style={{ marginLeft: isOpenSideBar ? "50px" : "0px" }}
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
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpenSideBar ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
          <div className="link" activeclassname="active">
            <div className="icon">
              <FaSignOutAlt
                cursor={"pointer"}
                onClick={() => {
                  onLogout();
                  window.location.href = "/";
                }}
              />
            </div>
            <div
              style={{
                display: isOpenSideBar ? "block" : "none",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={() => {
                onLogout();
                window.location.href = "/";
              }}
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
