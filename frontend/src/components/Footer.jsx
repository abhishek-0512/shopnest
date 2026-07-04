import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <h2 className="footer-logo">ShopNest</h2>
          <p className="footer-text">
            Your one-stop destination for premium fashion, electronics, and
            lifestyle products.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>

          <Link to="/contact">Contact Us</Link>
          <Link to="/return">Return Policy</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#">
              <FaFacebook />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <hr />

      <p className="copyright">
        © {new Date().getFullYear()} ShopNest. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;