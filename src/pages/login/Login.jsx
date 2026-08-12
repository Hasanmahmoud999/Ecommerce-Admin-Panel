import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Person } from "@material-ui/icons";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { userName, password }, navigate);
  };
  return (
    <div className="login">
      <form className="loginForm">
        <div className="loginBrand">
          <span className="loginBrandIcon">🛍️</span>
          <span className="loginBrandTitle">Store Admin</span>
        </div>
        <h1>Login</h1>
        <p className="loginWelcome">
          Welcome back! Please sign in to continue.
        </p>
        <div className="loginFormContainer">
          <input
            required
            className="loginInput"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label
            className="loginFormContainerText"
            htmlFor=""
          >
            Username
          </label>
          <Person className="icon" />
        </div>
        <div className="loginFormContainer">
          <input
            required
            className="loginInput"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="loginFormContainerText">Password</label>
          <Lock className="icon" />
        </div>
        <div className="loginInfo">
          <span className="rememberme">
            <input type="checkbox" /> Remember me
          </span>
          <Link
            className="forgetPassword link"
            to="/"
          >
            Forget Password ?
          </Link>
        </div>
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
        <div className="demo">
          <h5 className="demoTitle">Test Information</h5>

          <div className="demoInfoContainer">
            <p className="demoInfo">User Name :</p>
            <p className="demoInfo">admin / viewer</p>
          </div>

          <div className="demoInfoContainer">
            <p className="demoInfo">Password :</p>
            <p className="demoInfo">123456</p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
