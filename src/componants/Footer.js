import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Office Address */}
        <div className="footer-section">
          <h3>Office Address</h3>
          <p>Lapticare Pvt. Ltd.</p>
          <p>123 Main Street, Near City Mall</p>
          <p>Pune, Maharashtra, 411001</p>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Phone: +91 98765 43210</p>
          <p>Email: support@losshu.com</p>

          <div className="footer-buttons">
            <button className="footer-btn">Join Us</button>
            <button className="footer-btn enquiry">Enquiry</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
      All rights reserved | Designed and Developed by Lapticare
      </div>
    </footer>
  );
};

export default Footer;
