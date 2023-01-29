import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";
import Searchbar from "../Searchbar/Searchbar";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isActive, setisActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [pathname, setPathname] = useState(location.pathname);
  
  useEffect(() => {
    setPathname(location.pathname);
}, [location]);

  const handler = () => {
    setToggle((current) => !current);
    setisActive((current) => !current);
  };

  useEffect(() => {}, [toggle]);

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
          {["filter search", "roulette", "analytics","account"].map((item) => {
            return (
              <li className={`link ${pathname === `/${item.replace(" ", "-")}` ? "active" : ""}`} 
                key={`${item}`}>
                <Link to={`/${item.replace(" ", "-")}`}>
                  {item === "account" ? <FaUser /> : item}
                </Link>
              </li>
            );
          })}
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
              {["filter search", "roulette", "analytics", "account"].map((item) => (
                <li className={`nav-menu-links ${pathname === `/${item.replace(" ", "-")}` ? "active" : ""}`} key={`${item}`}>
                  <Link onClick={handler} to={`/${item.replace(" ", "-")}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
