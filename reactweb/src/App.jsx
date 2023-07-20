import React from "react";
import UserTable from "./components/UserTable";
import Login from "./components/login";

const App = () => {
  const isLoggedIn = false;

  return <div>{isLoggedIn ? <UserTable /> : <Login />}</div>;
};

export default App;
