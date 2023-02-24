import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";
import Searchbar from "../Searchbar/Searchbar";
import logo from "../../assets/logo.png";
import axios from "axios";

const Navbar = () => {
  // use the useLocation hook to get the current pathname of the page
  const location = useLocation();
  // define state variables for the hamburger menu and active links
  const [isActive, setisActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  // state variable to track the current pathname
  const [pathname, setPathname] = useState(location.pathname);
  // state variable to track whether user is logged in
  const [loggedIn, setLoggedIn] = useState(
    localStorage.accessToken ? true : false
  );

  // update the pathname state variable when location changes
  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  // update the loggedIn variable when the localStorage.accessToken changes
  useEffect(() => {
    setLoggedIn(localStorage.accessToken ? true : false);
  }, [localStorage.accessToken]);

  const handler = () => {
    setToggle((current) => !current);
    setisActive((current) => !current);
  };

  // fuction to log out user if they are logged in
  const logout = async () => {
    try {
      await axios.delete("/logout");
    } catch (err) {
      console.log(err);
    }
  };

  // function handling user login and logout
  const loginHandler = () => {
    // if there is accessToken in localStorage
    if (localStorage.accessToken) {
      // set the loggedIn state to true
      setLoggedIn(true);
      // call logout function
      logout();
      // clear localStorage of the accessToken
      localStorage.clear();
    } else {
      // setLoggedIn to false
      setLoggedIn(false);
    }
  };

  // Render the navbar
  return (
    <nav className="navbar">
      {/* Logo container/ displays logo from the assets folder */}
      <div className="logo-container">
        <a href="/">
          <img className="logo" src={logo} alt="logo" />
        </a>
      </div>
      {/* Render searchbar component and the navigation links */}
      <div className="navigation">
        <Searchbar />
        <ul className="nav-links">
          {["filter search", "roulette", "analytics"].map((item) => (
            // Render a navigation link for each page
            <li
              className={`link ${
                pathname === `/${item.replace(" ", "-")}` ? "active" : ""
              }`}
              key={`${item}`}
            >
              <Link to={`/${item.replace(" ", "-")}`}>{item}</Link>
            </li>
          ))}
          {/* renders user icon if user is logged out and "Logout" anchor when logged in */}
          <li className={`link ${pathname === "/account" ? "active" : ""}`}>
            {loggedIn ? (
              // if the user is logged in, renders a logout link
              <a className="link" href="/account" onClick={loginHandler}>
                log out
              </a>
            ) : (
              // if the user is not logged in, render a user icon (links to login page)
              <a href="/account" onClick={loginHandler}>
                <FaUser />
              </a>
            )}
          </li>
        </ul>
        {/* Renders a hamburger menu */}
        <div
          className="hambrgr-menu flex-center"
          onClick={handler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handler();
            }
          }}
          role="button"
          tabIndex="0"
        >
        {/* Top line of the hamburger menu */}
          <div
            id="top"
            className={`ham-line ease-transition ${
              isActive ? "top-line-animate" : ""
            }`}
          ></div>
          {/* Middle line of the hamburger menu */}
          <div
            id="middle"
            className={`ham-line ease-transition ${
              isActive ? "middle-line-animate" : ""
            }`}
          ></div>
          {/* Bottom line of the hamburger menu */}
          <div
            id="bottom"
            className={`ham-line ease-transition ${
              isActive ? "bottom-line-animate" : ""
            }`}
          ></div>
        </div>
        {/* Renders a dropdown menu when hamburger icon is clicked */}
        {toggle && (
          <div className="nav-menu flex-center">
            <ul>
              {["filter search", "roulette", "analytics"].map((item) => (
                // Render a navigation link for each page
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
              ))}
              {/* renders account logo if user is logged out and "Logout" anchor when logged in */}
              <li className={`nav-menu-links`}>
                {loggedIn ? (
                  <Link
                    onClick={() => {
                      loginHandler();
                      handler();
                    }}
                    to="/account"
                  >
                    Log Out
                  </Link>
                ) : (
                  <Link
                    onClick={() => {
                      loginHandler();
                      handler();
                    }}
                    to="/account"
                  >
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
