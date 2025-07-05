import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="header-container">
        <div class="logo">
          <h2>hello</h2>
        </div>
        <nav class="nav">
          <ul>
            <li>
              <a href="#">DashBoard</a>
            </li>
            <li>
              <a href="#">Clases</a>
            </li>
            <li>
              <a href="#">Alumnos</a>
            </li>
            <li>
              <a href="#">Profesores</a>
            </li>
            <li>
              <a href="#">Pagos</a>
            </li>
          </ul>
          <div class="hamburger">
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
