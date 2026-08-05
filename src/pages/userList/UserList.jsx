import React, { useEffect, useState } from "react";
import "./UserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../../redux/apiCalls";
const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);
  const [loading, setLoading] = useState(false);

  const TOKEN = useSelector((state) => state.user.currentUser.accessToken);

  const handleDelete = (id) => {
    deleteUsers(id, dispatch, TOKEN);
  };

  useEffect(() => {
    getUsers(dispatch, TOKEN);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [dispatch, loading]);
  // console.log(users);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.img ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwlFdK4Fmpad8A_e9TgXmNnb0wP1IwU6x1w&s"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 120,
    // },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      {loading && (
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          disableSelectionOnClick
          checkboxSelection
        />
      )}
    </div>
  );
};

export default UserList;
