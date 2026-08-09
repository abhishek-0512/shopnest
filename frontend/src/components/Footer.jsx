import React from "react";
import { Link } from "react-router-dom";
import {
  FiTruck,
  FiShield,
  FiAward,
  FiHeart,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";


import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      {/* HIGHLIGHT PERKS STRIP */}
      <div className="footer-perks-strip">
        <div className="footer-perks-container">
          <div className="footer-perk-item">
            <FiTruck className="perk-icon" />
            <div>
              <strong>Pan-India Express Shipping</strong>
              <span>Free on all orders above ₹999</span>
            </div>
          </div>

          <div className="footer-perk-item">
            <FiShield className="perk-icon" />
            <div>
              <strong>100% Buyer Protection</strong>
              <span>Encrypted Razorpay payments & COD</span>
            </div>
          </div>

          <div className="footer-perk-item">
            <FiAward className="perk-icon" />
            <div>
              <strong>Certified Authentic Brands</strong>
              <span>With official manufacturer warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main-container">
        <div className="footer-columns-grid">
          {/* BRAND COLUMN */}
          <div className="footer-col brand-col">
            <Link to="/" className="navbar-logo">
              <div className="logo-icon-wrap">
                <span className="logo-text-icon">S</span>
              </div>
              <div className="logo-text-group">
                <span className="brand-name">
                  Shop<span className="brand-highlight">Nest</span>
                </span>
                <span className="brand-badge">PREMIUM E-COMMERCE</span>
              </div>
            </Link>

            <p className="footer-brand-desc">
              Next-generation shopping destination offering curated flagships in
              electronics, bespoke apparel, fitness gear, and wellness essentials.
            </p>

            <div className="footer-social-row">
              <a
                href="https://github.com/abhishek-0512/shopnest"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title="GitHub"
              >
                <FiGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="mailto:support@shopnest.com"
                className="social-link"
                title="Contact Support"
              >
                <FiMail />
              </a>
            </div>
          </div>

          {/* SHOP DEPARTMENTS */}
          <div className="footer-col">
            <h4>Departments</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/shop?category=electronics">Electronics & Audio</Link>
              </li>
              <li>
                <Link to="/shop?category=fashion">Fashion & Apparel</Link>
              </li>
              <li>
                <Link to="/shop?category=sports">Sports & Performance</Link>
              </li>
              <li>
                <Link to="/shop?category=medicines">Medicines & Wellness</Link>
              </li>
              <li>
                <Link to="/shop">View All Products</Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/cart">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/wishlist">Saved Wishlist</Link>
              </li>
              <li>
                <Link to="/myorders">Order Tracking</Link>
              </li>
              <li>
                <Link to="/profile">My Account</Link>
              </li>
              <li>
                <Link to="/admin">Admin Suite</Link>
              </li>
            </ul>
          </div>

          {/* POLICIES & SUPPORT */}
          <div className="footer-col">
            <h4>Customer Trust</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/return-policy">7-Day Return Policy</Link>
              </li>
              <li>
                <Link to="/disclaimer">Disclaimer & Terms</Link>
              </li>
              <li>
                <Link to="/about">About ShopNest</Link>
              </li>
              <li>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  Helpline: +91 1800-SHOPNEST
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} ShopNest Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="footer-credit">
            Engineered with <FiHeart className="heart-icon" /> by <strong>Abhishek Gangwar</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;