import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import Logo from "./Logo/Logo";
import "./Logo/logo.css";
import { Link } from "react-router-dom";
import "../Pages/sign.css";
import User from "./User/user";
const HeaderCompo = (props) => {
  const status = props.loggedin;
  //console.log(status);

  const [show, setShow] = useState(true);
  const [showUser, setShowUser] = useState(true);

  /*const [isLoggedIn, setIsLoggedIn] = useState(false);
   */

  useEffect(() => {
    //status ? setIsLoggedIn(true) : setIsLoggedIn(false);
    //console.log(status);
  }, [status]);

  const handleClick = () => {
    setShow(!show);
  };

  const handleClickUser = () => {
    setShowUser(!showUser);
  };

  const [nav, setNav] = useState(false);
  const handleNavClick = () => {
    setNav(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".menu-icon") && show) {
        setShow(false);
      }
    };
    if (show) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [show]);

  return (
    <div>
      <Logo />
      <div className="a">
        {<NavBar status={status} />}

        <img
          className="menu-icon"
          onClick={handleClick}
          src="https://cdn.icon-icons.com/icons2/916/PNG/512/Menu_icon_icon-icons.com_71858.png"
          alt="logo"
        />
      </div>
      <img
        src={require("../icon/user.jpg")}
        onClick={handleClickUser}
        className="user-logo"
      ></img>

      {/*{showUser?*/}
      <div>
        {status ? (
          <div className="login-signup-container">
            <Link to="#" className="register-btn logout">
              LogOut
            </Link>
          </div>
        ) : (
          <div className="login-signup-container">
            <Link className="login-btn" to={"/user/login"}>
              Login
            </Link>
            <Link className="register-btn" to="/user/register">
              Register
            </Link>
          </div>
        )}
      </div>
      {/*''*/}

      <div onClick={handleNavClick} className="mobile">
        {show && <NavBar />}
        <img
          className="menu-icon"
          onClick={handleClick}
          src="https://cdn.icon-icons.com/icons2/916/PNG/512/Menu_icon_icon-icons.com_71858.png"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default HeaderCompo;
