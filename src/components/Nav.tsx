import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedin } from "../state/counter/counterSlice";
import "./Nav.css"; // Import CSS for styling

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/home" className="menu-link">Home</Link>
          </li>
          <li className="menu-item">
            <Link to="/about" className="menu-link">About</Link>
          </li>
          <li className="menu-item">
            <Link to="/contact" className="menu-link">Contact</Link>
          </li>
          <li className="menu-item">
            <a
              href="#"
              className="menu-link logout-link"
              onClick={() => {
                navigate("/login")
                dispatch(loggedin(false));
              }}
            >
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;