import React from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCode,
  FiServer,
  FiDatabase,
  FiCpu,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

const About = () => {
  return (
    <div className="cart-page" style={{ maxWidth: "1000px" }}>
      <div className="cart-header-title text-center" style={{ textAlign: "center" }}>
        <span className="section-kicker">Architecture & Engineering</span>
        <h1>
          About <span className="gradient-text">ShopNest Platform</span>
        </h1>
        <p style={{ maxWidth: "680px", margin: "8px auto 0" }}>
          A full-stack, enterprise-ready MERN e-commerce application engineered by{" "}
          <strong>Abhishek Gangwar</strong> with luxury UI aesthetics, robust JWT authentication,
          real-time cart & wishlist synchronization, and scalable architecture.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: "40px", marginBottom: "35px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "24px",
              background: "var(--primary-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              color: "#fff",
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
            }}
          >
            AG
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "1.8rem", margin: "0 0 4px" }}>Abhishek Gangwar</h2>
            <p style={{ color: "var(--primary-light)", fontWeight: "700", margin: "0 0 8px" }}>
              Full-Stack Software Engineer • MERN Specialist
            </p>
            <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
              Passionate about building high-performance web applications with delightful user experiences,
              scalable microservices, and modern frontend design systems.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href="https://github.com/abhishek-0512/shopnest"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href="mailto:abhishekgangwar@example.com"
              className="btn-primary"
            >
              <FiMail /> Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* TECH STACK BREAKDOWN */}
      <h2 style={{ fontSize: "1.6rem", marginBottom: "20px" }}>Core Technology Stack</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div className="glass-panel" style={{ padding: "24px" }}>
          <FiCode style={{ fontSize: "1.8rem", color: "var(--primary-light)", marginBottom: "10px" }} />
          <h4>Frontend Core</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
            React 19, Redux Toolkit, React Router v7, Custom Glassmorphic CSS System.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: "24px" }}>
          <FiServer style={{ fontSize: "1.8rem", color: "#34d399", marginBottom: "10px" }} />
          <h4>Backend Engine</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Node.js, Express.js 5.0, JWT Authentication, Multer & Cloudinary CDN.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: "24px" }}>
          <FiDatabase style={{ fontSize: "1.8rem", color: "#fbbf24", marginBottom: "10px" }} />
          <h4>Database & Cache</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
            MongoDB Atlas, Mongoose 9.7, Embedded Subdocuments for Reviews & Orders.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: "24px" }}>
          <FiShield style={{ fontSize: "1.8rem", color: "#e879f9", marginBottom: "10px" }} />
          <h4>Payments & Security</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Razorpay Integration, Bcrypt Hashing, Role-Based Access Control (RBAC).
          </p>
        </div>
      </div>

      {/* HIGHLIGHTED CAPABILITIES */}
      <div className="glass-panel" style={{ padding: "32px", marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "16px" }}>Key Features & Resume Highlights</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {[
            "Interactive Product Reviews & 5-Star Rating engine with real-time recalculation",
            "Multi-faceted search & filtering (Category pills, Price slider, In-stock toggle)",
            "Dynamic Coupon engine with instant mathematical discount breakdowns",
            "Visual 5-step Shipment Tracking timeline with real-time status updates",
            "Printable & downloadable tax invoice generator with GST and itemized tables",
            "Full-featured Executive Admin Suite (Product CRUD, Order management, User directory)",
            "Resilient Offline/Demo mode that seamlessly operates across any environment",
            "100% Mobile-responsive luxury glassmorphism UI with micro-interactions",
          ].map((feat, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              <FiCheckCircle style={{ color: "var(--emerald)", flexShrink: 0, marginTop: "3px" }} />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/shop" className="btn-primary" style={{ padding: "14px 32px" }}>
          Experience ShopNest Store <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default About;