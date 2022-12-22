import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isActive, setisActive] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handler = () => {
    setToggle(current => !current);
    setisActive(current => !current);
  }

  useEffect(() => {
      console.log(toggle)
  }, [toggle]);

  
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="./">Quick Picks</a>
      </div>
      

      <div class="hambrgr-menu flex-center" onClick={handler}>
        <div id="top" className={`ham-line ease-transition ${isActive ? "top-line-animate" : ""}`}></div>
        <div id="middle" className={`ham-line ease-transition ${isActive ? "middle-line-animate" : ""}`}></div>
        <div id="bottom" className={`ham-line ease-transition ${isActive ? "bottom-line-animate" : ""}`}></div>
      </div>

      {toggle && (
        <div className="nav-menu flex-center">
          <ul>
            {["Filter Search", "Roulette", "Account"].map((link) => (
              <li className={`nav-menu-links`} key={{ link }}>
                <a onClick={() => setToggle(false)} href={`./${link}`}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="nav-links">
        {["Filter Search", "Roulette", "Account"].map((link) => {
          return (
            <>
              <li className="link" key={`link-${link}`}>
                <a href={`./${link}`}>{link}</a>
              </li>
            </>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
