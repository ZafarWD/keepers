import React, { Component } from "react";

import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
          <NavLink
            style={{
              fontSize: "40px",
              fontWeight: "bolder",
              // color: "grey",
              letterSpacing: "0.5px",
              fontFamily: "Montserrat Subrayada"
            }}
            className="navbar-brand text-dark"
            to="/home"
          >
            Keepers.com
          </NavLink>
          <ul
            className="navbar-nav ml-auto"
            style={{ fontSize: "25px", fontFamily: "Ubuntu" }}
          >
            <li className="nav-item mr-3">
              <NavLink className="nav-link text-dark" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item mr-3">
              <NavLink className="nav-link text-dark" to="/mypasses">
                My Passwords
              </NavLink>
            </li>
            <li className="nav-item mr-3">
              <NavLink className="nav-link text-dark" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
