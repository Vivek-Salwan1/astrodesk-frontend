import React, { useState } from 'react';
import "../styles/nav.css";
import logoImg from "../images/logo.png";

const Nav = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <a> <img src={logoImg} alt="logo" /> </a>
      </div>
      <div className="nav-links">
     
      </div>
      <div className="auth-btns">
        <div 
          className="login-dropdown"
          onMouseEnter={() => setShowLoginOptions(true)}
          onMouseLeave={() => setShowLoginOptions(false)}
        >
          <a className="btn">Sign In</a>
          {showLoginOptions && (
            <div className="login-options">
              <a href="/login" className="login-option">Admin Login</a>
              <a href="/super-admin-login" className="login-option">Super Admin Login</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
