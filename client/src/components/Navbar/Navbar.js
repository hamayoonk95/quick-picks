import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";
import Searchbar from "../Searchbar/Searchbar";
import logo from "../../assets/logo.png";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const [isActive, setisActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [pathname, setPathname] = useState(location.pathname);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.accessToken ? true : false
  );

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  useEffect(() => {
    setLoggedIn(localStorage.accessToken ? true : false);
    console.log(localStorage);
    console.log(loggedIn);
  }, [localStorage.accessToken]);

  const handler = () => {
    setToggle((current) => !current);
    setisActive((current) => !current);
  };

  const logout = async () => {
    try {
      await axios.delete("/logout");
    } catch (err) {
      console.log(err);
    }
  };

  const loginHandler = () => {
    if (localStorage.accessToken) {
      setLoggedIn(true);
      logout();
      localStorage.clear();
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="/">
          <img className="logo" src={logo} alt="logo" />
        </a>
      </div>
      <div className="navigation">
        <Searchbar />
        <ul className="nav-links">
          {["filter search", "roulette", "analytics"].map((item) => (
            <li
              className={`link ${pathname === `/${item.replace(" ", "-")}` ? "active" : ""}`}
              key={`${item}`}
            >
              <Link to={`/${item.replace(" ", "-")}`}>{item}</Link>
            </li>
          ))}
          <li className={`link ${pathname === "/account" ? "active" : ""}`}>
            {loggedIn ? (
              <a className="link" href="/account" onClick={loginHandler}>
                log out
              </a>
            ) : (
              <a href="/account" onClick={loginHandler}><FaUser /></a>
            )}
          </li>
        </ul>

        <div className="hambrgr-menu flex-center" onClick={handler}>
          <div
            id="top"
            className={`ham-line ease-transition ${
              isActive ? "top-line-animate" : ""
            }`}
          ></div>
          <div
            id="middle"
            className={`ham-line ease-transition ${
              isActive ? "middle-line-animate" : ""
            }`}
          ></div>
          <div
            id="bottom"
            className={`ham-line ease-transition ${
              isActive ? "bottom-line-animate" : ""
            }`}
          ></div>
        </div>

        {toggle && (
          <div className="nav-menu flex-center">
          <ul>
              {["filter search", "roulette", "analytics"].map(
                (item) => (
                  <li
                    className={`nav-menu-links ${
                      pathname === `/${item.replace(" ", "-")}` ? "active" : ""
                    }`}
                    key={`${item}`}
                  >
                    <Link onClick={handler} to={`/${item.replace(" ", "-")}`}>
                      {item}
                    </Link>
                  </li>
                )
              )}
              <li className={`nav-menu-links`}>
                {loggedIn ? (
                  <Link onClick={() => {loginHandler(); handler()}} to="/account">
                    Log Out
                  </Link>
                ) : (
                  <Link onClick={() => {loginHandler(); handler()}} to="/account">
                    Log In / Sign Up
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
