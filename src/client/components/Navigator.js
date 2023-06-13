import React from "react";
import { Link } from "react-router-dom";
import "./Navigator.css";

export default function Navigator() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
            About
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/favorite" className="navbar-link">
            Favorite
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
