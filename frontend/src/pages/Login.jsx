import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import "../styles/auth.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        login(data);
        toast.success(`Welcome back, ${data.name || "User"}! 🎉`);
        navigate(data.role === "admin" ? "/admin" : "/");
      } else {
        // Fallback for demo credentials
        if (email.includes("admin")) {
          handleDemoLogin("admin");
        } else {
          handleDemoLogin("user");
        }
      }
    } catch (err) {
      console.warn("Backend unavailable, activating demo session:", err.message);
      handleDemoLogin(email.includes("admin") ? "admin" : "user");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role = "user") => {
    const demoUser =
      role === "admin"
        ? {
            _id: "usr_demo_admin_01",
            name: "Abhishek Gangwar (Admin)",
            email: "admin@shopnest.com",
            role: "admin",
            verified: true,
            token: "demo_admin_token_sample",
          }
        : {
            _id: "usr_demo_buyer_01",
            name: "Aarav Sharma",
            email: "aarav.sharma@example.com",
            role: "user",
            verified: true,
            token: "demo_user_token_sample",
          };

    login(demoUser);
    toast.success(`Signed in as Demo ${role.toUpperCase()} ⚡`);
    navigate(role === "admin" ? "/admin" : "/shop");
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <Link to="/" className="auth-logo-badge">
            <span className="logo-sparkle">✦</span>
            <span>ShopNest Access</span>
          </Link>
          <h2>Welcome Back</h2>
          <p>Sign in to manage your orders, wishlist, and exclusive member discounts.</p>
        </div>

        {/* DEMO 1-CLICK PILLS */}
        <div className="demo-credentials-box">
          <span className="demo-hint-title">⚡ Portfolio Fast-Access Demo:</span>
          <div className="demo-buttons-row">
            <button
              type="button"
              className="demo-btn-pill admin"
              onClick={() => handleDemoLogin("admin")}
            >
              <FiShield /> 1-Click Admin Mode
            </button>
            <button
              type="button"
              className="demo-btn-pill user"
              onClick={() => handleDemoLogin("user")}
            >
              <FiUser /> 1-Click Buyer Mode
            </button>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label>Password</label>
              <span style={{ fontSize: "0.75rem", color: "var(--primary-light)", cursor: "pointer" }}>
                Forgot Password?
              </span>
            </div>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"} <FiArrowRight />
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account yet?{" "}
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;