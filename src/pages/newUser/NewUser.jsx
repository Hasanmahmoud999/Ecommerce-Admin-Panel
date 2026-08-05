import React, { useState } from "react";
import "./NewUser.css";
import { addUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NewUser = () => {
  const [newUser, setNewUser] = useState({ active: true });
  const { isFetching } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(newUser);

  const handleCreate = (e) => {
    e.preventDefault();
    addUser(newUser, dispatch);
    navigate("/users");
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Create New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="john"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="John Smith"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="+963 654251864"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Homs | Syria"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select
            name="active"
            id="active"
            className="newUserSelect"
            onChange={handleChange}
          >
            <option value="true" defaultValue="true">
              Yes
            </option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label for="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              onChange={handleChange}
              value="female"
            />
            <label for="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleChange}
            />
            <label for="other">other</label>
          </div>
        </div>

        <button
          className="newUserButton"
          onClick={handleCreate}
          disabled={isFetching}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUser;
