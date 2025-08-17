import React from 'react';
import '../styles/whatislosshu.css';

const WhatIsLosshu = () => {
  return (
    <section className="losshu-section">
      <div className="losshu-content">
        <h2 className="losshu-title">What is a Losshu Report?</h2>
        <p className="losshu-intro">
          The <strong>Losshu Report</strong> is based on the ancient Lo Shu Grid, a 3x3 numerology chart
          rooted in Chinese mysticism. It reveals deep insights about your personality, strengths, and
          life challenges by using the digits of your birthdate.
        </p>

        <div className="losshu-grid-layout">
          <div className="losshu-text-block">
            <h3>🔮 About the Lo Shu Grid</h3>
            <p>
              The grid consists of numbers 1 through 9 arranged so every row, column, and diagonal adds
              up to 15 — a symbol of harmony. Each number maps to traits and life aspects like health,
              success, and relationships.
            </p>
            <ul>
              <li><strong>1:</strong> Leadership & Creativity</li>
              <li><strong>5:</strong> Freedom & Communication</li>
              <li><strong>9:</strong> Compassion & Spirituality</li>
            </ul>
          </div>

          <div className="losshu-image-block">
            <img
              src="https://shraddhashreegems.com/wp-content/uploads/2022/06/1-6.jpg.webp"
              alt="Lo Shu Grid"
              className="losshu-image"
            />
          </div>
        </div>

        <div className="losshu-highlights">
          <h3>What You’ll Discover?</h3>
          <div className="losshu-cards">
            <div className="losshu-card">🧠 Personality Analysis</div>
            <div className="losshu-card">🗺️ Life Path Guidance</div>
            <div className="losshu-card">🌟 Missing Number Traits</div>
            <div className="losshu-card">🌌 Elemental Strengths</div>
          </div>
        </div>

        <p className="losshu-conclusion">
          Losshu Reports help you unlock hidden aspects of your life and empower your decisions with
          spiritual clarity.
        </p>
      </div>
    </section>
  );
};

export default WhatIsLosshu;
