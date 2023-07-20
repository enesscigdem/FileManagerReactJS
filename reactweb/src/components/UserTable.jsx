import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7104/api/User/GetAllUsers"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h3 style={{ color: "green", fontSize: "20px", textAlign: "center" }}>
        {" "}
        Giriş Başarılı{" "}
      </h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı Adı</th>
            <th>Şifre</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.userID}</td>
              <td>{user.userName}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
