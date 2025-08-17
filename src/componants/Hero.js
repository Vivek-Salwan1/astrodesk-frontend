// src/components/Hero.jsx
import React from "react";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="hero-content">
        <h1>Welcome to AstroDesk</h1>
        <p>Astrology Report Generation and Customer Management Tool</p>
      </div>
    </section>
  );
};

export default Hero;
