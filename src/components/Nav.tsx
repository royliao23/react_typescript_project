import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loggedin } from "../state/counter/counterSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuClick = (action?: () => void) => {
    setIsDropdownOpen(false); // Close the dropdown
    if (action) action(); // Execute additional actions, if any
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo" onClick={() => setIsDropdownOpen(false)}>
          <img src="/react_typescript_project/logo192.png" alt="/logo192.png" />
          FlexiApp
        </Link>

        {/* Hamburger Menu */}
        <div
          className={`hamburger ${isDropdownOpen ? "open" : ""}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Menu */}
        <ul className={`menu ${isDropdownOpen ? "dropdown-active" : ""}`}>
          <li className="menu-item">
            <Link to="/home" className="menu-link" onClick={() => handleMenuClick()}>
              Home
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/articles" className="menu-link" onClick={() => handleMenuClick()}>
              Articles
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/authors" className="menu-link" onClick={() => handleMenuClick()}>
              Authors
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/about" className="menu-link" onClick={() => handleMenuClick()}>
              About
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/contact" className="menu-link" onClick={() => handleMenuClick()}>
              Contact
            </Link>
          </li>
          <li className="menu-item">
            <a
              href="#"
              className="menu-link logout-link"
              onClick={() =>
                handleMenuClick(() => {
                  navigate("/login");
                  dispatch(loggedin(false));
                })
              }
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
