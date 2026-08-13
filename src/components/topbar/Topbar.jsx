import React, { useEffect, useState } from "react";
import "./Topbar.css";
import {
  ExitToAppOutlined,
  Language,
  NotificationsNone,
  Settings,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutStart, logOutSuccess } from "../../redux/slices/userSlice";

const Topbar = () => {
  // const admin = JSON.parse(
  //     JSON.parse(localStorage.getItem("persist:root")).user
  // ).currentUser?.isAdmin;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isFetching } = useSelector((state) => state.user);
  console.log(currentUser);
  const handleLogout = () => {
    dispatch(logOutStart());
    setTimeout(() => {
      dispatch(logOutSuccess());
      setLoading(true);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="topbar">
      <div className="topbarwrapper">
        <div className="topleft">
          <Link
            to={"/"}
            className="link"
          >
            <span className="logo">Dashboard</span>
          </Link>
        </div>
        <div className="topright">
          {/* {admin && ( */}
          <>
            <div className="topbarIconContainer">
              <NotificationsNone />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <Language />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <Settings />
            </div>
            <img
              src={
                currentUser
                  ? currentUser?.img
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03NgdF9L0GIRhUQriHTDoJt888Zte9DhNTA&s"
              }
              alt=""
              className="topAvatar"
            />
            <button
              className="topbarLogoutButtonContainer"
              onClick={handleLogout}
              disabled={loading}
            >
              <span className="topbarLogoutText">Log Out</span>
              <ExitToAppOutlined style={{ padding: "5px" }} />{" "}
            </button>
          </>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
