import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleHamburgerClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <h2>hello</h2>
        </div>
        <nav className="nav">
          <ul className={showMenu ? "show" : ""}>
            <li>
              <NavLink to="/Dashboard" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/clases">Clases</NavLink>
            </li>
            <li>
              <NavLink to="/alumnos">Alumnos</NavLink>
            </li>
            <li>
              <NavLink to="/profesores">Profesores</NavLink>
            </li>
            <li>
              <NavLink to="/pagos">Pagos</NavLink>
            </li>
          </ul>
          <div className="hamburger" onClick={handleHamburgerClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
