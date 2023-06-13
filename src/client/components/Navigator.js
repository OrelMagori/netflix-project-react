import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import './Navigator.css';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navigator() {
  const { dispatch } = useAuthContext();

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
  };

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
        <li className="navbar-item navbar-item-logout">
          <Link to="/" className="navbar-link" onClick={logout}>
            <FiLogOut className="logout-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

