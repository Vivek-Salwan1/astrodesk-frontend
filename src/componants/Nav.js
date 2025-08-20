import React, { useState } from 'react';
import "../styles/nav.css";
import logoImg from "../images/logo.png";

const Nav = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a> <img src={logoImg} alt="logo" /> </a>
      </div>
      
      {/* Desktop Navigation */}
      <div className="nav-links">
        {/* Add your navigation links here if needed */}
      </div>
      
      {/* Desktop Auth Buttons */}
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

      {/* Mobile Menu Toggle */}
      <div 
        className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-login-options">
          <a href="/login" className="mobile-login-option" onClick={closeMobileMenu}>
            Admin Login
          </a>
          <a href="/super-admin-login" className="mobile-login-option" onClick={closeMobileMenu}>
            Super Admin Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
