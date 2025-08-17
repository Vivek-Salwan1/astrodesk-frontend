import React from 'react';
import '../styles/howtoguide.css';

const steps = [
  "Visit losshu.com",
  "Navigate to Admin Login",
  "Fill Person's Data",
  "Click Submit",
  "Download/View Report"
];

const HowToGuide = () => {
  return (
    <div className="losshu-container">
      <h2 className="losshu-title">How to Generate Losshu Report?</h2>
      <div className="losshu-steps">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{index + 1}</div>
            <p className="step-text">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToGuide;
