// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// const UserList = ({ userID, token }) => {
//   const [users, setUsers] = useState([]);
//   if (userID === 1) {
//     const config = {
//       headers: { Authorization: `Bearer ${token}` },
//     };
//     useEffect(() => {
//       const fetchUsers = async () => {
//         try {
//           const response = await axios.get(
//             "https://localhost:7104/api/User/GetAllUsers",
//             config
//           );
//           const usersWithIds = response.data.map((user) => ({
//             ...user,
//             id: user.userID,
//           }));
//           setUsers(usersWithIds);
//         } catch (error) {
//           console.error("Error fetching users:", error);
//         }
//       };
//       fetchUsers();
//     }, []);
//   } else {
//     <h2>Bu sayfayı görme yetkiniz yok!</h2>;
//   }
//   const columns = [
//     {
//       field: "userID",
//       headerName: "User ID",
//       width: 150,
//       headerClassName: "boldHeader",
//     },
//     {
//       field: "userName",
//       headerName: "Username",
//       width: 200,
//       headerClassName: "boldHeader",
//     },
//     {
//       field: "password",
//       headerName: "Password",
//       width: 200,
//       headerClassName: "boldHeader",
//     },
//   ];
//   return (
//     <>
//       <Stack
//         marginTop={2}
//         marginBottom={2}
//         spacing={2}
//         height={60}
//         direction="row"
//         alignItems="center"
//       >
//         <Button size="small" color="success" variant="contained">
//           Klasör Oluştur
//         </Button>
//         <Button size="small" color="primary" variant="contained">
//           Dosya Yükle
//         </Button>
//         <Button size="small" color="warning" variant="contained">
//           Klasör Yükle
//         </Button>
//       </Stack>
//       <style>
//         {`
//           .boldHeader .MuiDataGrid-columnHeaderTitle {
//             font-weight: bold;
//           }
//         `}
//       </style>
//       <div style={{ height: 620, width: "100%" }}>
//         <DataGrid
//           rows={users}
//           columns={columns}
//           {...users}
//           initialState={{
//             ...users.initialState,
//             pagination: { paginationModel: { pageSize: 10 } },
//           }}
//           pageSizeOptions={[10, 25, 50, 100]}
//           slots={{ toolbar: GridToolbar }}
//           slotProps={{
//             toolbar: {
//               showQuickFilter: true,
//               quickFilterProps: { debounceMs: 100 },
//             },
//           }}
//         />
//       </div>
//     </>
//   );
// };
// export default UserList;
