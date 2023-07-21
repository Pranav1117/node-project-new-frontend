import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sign.css";
import { Link } from "react-router-dom";
import axios from "axios";
let storedData = [];
const LoginPage = () => {
  const nav = useNavigate();

  const [resStatus, setResStatus] = useState("");

  const [userLoginData, setUserLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempObj = {
      name: userLoginData.name,
      email: userLoginData.email,
      password: userLoginData.password,
    };

    storedData.push(tempObj);

    await axios
      .post("https://node-project-backend.onrender.com/login", tempObj)
      .then((res) => {
        const status = res.data;
        console.log(status);
        setResStatus(status);
        if (status === "Login succesfull") {
          nav("/", { state: status });
        }
      })
      .catch((err) => {
        console.log(err, "errrrrr");
      });

    setUserLoginData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <Link to="/" className="back-btn">
        Go Back
      </Link>

      <h3>LoginPage</h3>
      <hr />
      <form action="" method="post">
        <h3 className="text-sign-up">Login In</h3>

        <label>Email :</label>
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          value={userLoginData.email}
          onChange={handleOnChange}
        />

        <label>Password :</label>
        <input
          type="password"
          placeholder="enter password"
          name="password"
          value={userLoginData.password}
          onChange={handleOnChange}
        />

        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Login
        </button>
        <div className="resStatus">{resStatus}</div>
      </form>
    </div>
  );
};

export default LoginPage;
