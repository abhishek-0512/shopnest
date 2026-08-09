import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSearch,
  FiGrid,
  FiHome,
  FiLogOut,
  FiPackage,
  FiShield,
  FiChevronDown,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { sampleProducts } from "../data/sampleProducts";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchContainerRef = useRef(null);
  const userMenuRef = useRef(null);

  const cartItems = useSelector((state) => state.cart?.cartItems) || [];
  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  const wishlistItems = useSelector((state) => state.wishlist?.items) || [];
  const wishlistCount = wishlistItems.length;

  // Scroll blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setSearchFocused(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live search suggestion filter
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const query = search.toLowerCase().trim();
    const matches = sampleProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      )
      .slice(0, 5);
    setSearchResults(matches);
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setSearchFocused(false);
      setMenuOpen(false);
    }
  };

  const handleSelectSuggestion = (productId) => {
    navigate(`/product/${productId}`);
    setSearch("");
    setSearchFocused(false);
  };

  const handleDemoAdminLogin = () => {
    login({
      _id: "usr_admin_demo",
      name: "Abhishek (Admin)",
      email: "admin@shopnest.com",
      role: "admin",
      verified: true,
      token: "demo_admin_jwt_token_sample",
    });
    setUserDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-wrapper">
        {/* BRAND LOGO */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon-wrap">
            <span className="logo-sparkle">✦</span>
            <span className="logo-text-icon">S</span>
          </div>
          <div className="logo-text-group">
            <span className="brand-name">
              Shop<span className="brand-highlight">Nest</span>
            </span>
            <span className="brand-badge">PREMIUM</span>
          </div>
        </Link>

        {/* LIVE SEARCH BAR */}
        <div className="navbar-search-container" ref={searchContainerRef}>
          <form className="navbar-search-bar" onSubmit={handleSearchSubmit}>
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search flagship phones, shoes, audio, health..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearch("")}
              >
                <FiX />
              </button>
            )}
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>

          {/* LIVE SEARCH DROPDOWN */}
          {searchFocused && search.trim() && (
            <div className="search-dropdown-menu">
              <div className="search-dropdown-header">
                <span>Matching Products ({searchResults.length})</span>
                <Link
                  to={`/shop?search=${encodeURIComponent(search)}`}
                  onClick={() => setSearchFocused(false)}
                >
                  View all results <FiArrowRight />
                </Link>
              </div>

              {searchResults.length > 0 ? (
                <div className="search-dropdown-list">
                  {searchResults.map((item) => (
                    <div
                      key={item._id}
                      className="search-suggestion-item"
                      onClick={() => handleSelectSuggestion(item._id)}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="suggestion-img"
                      />
                      <div className="suggestion-details">
                        <h4>{item.name}</h4>
                        <div className="suggestion-meta">
                          <span className="suggestion-category">
                            {item.category}
                          </span>
                          <span className="suggestion-price">
                            ₹{Number(item.price).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="search-no-results">
                  <p>No products matching "{search}"</p>
                  <Link
                    to="/shop"
                    className="explore-link"
                    onClick={() => setSearchFocused(false)}
                  >
                    Browse all categories
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* DESKTOP NAV LINKS & ACTIONS */}
        <nav className="navbar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <FiHome /> Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <FiGrid /> Shop All
          </NavLink>

          {/* WISHLIST */}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `nav-icon-btn ${isActive ? "active" : ""}`
            }
            title="My Wishlist"
          >
            <FiHeart />
            {wishlistCount > 0 && (
              <span className="icon-badge badge-rose-glow">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          {/* CART */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-icon-btn ${isActive ? "active" : ""}`
            }
            title="Shopping Cart"
          >
            <FiShoppingCart />
            {totalCartCount > 0 && (
              <span className="icon-badge badge-primary-glow">
                {totalCartCount}
              </span>
            )}
          </NavLink>

          {/* USER PROFILE / AUTH MENU */}
          <div className="user-menu-wrapper" ref={userMenuRef}>
            {user ? (
              <button
                className="user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="avatar-circle">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="user-name-box">
                  <span className="user-display-name">
                    {user.name.split(" ")[0]}
                  </span>
                  {user.role === "admin" ? (
                    <span className="role-tag-admin">Admin</span>
                  ) : (
                    <span className="role-tag-user">Buyer</span>
                  )}
                </div>
                <FiChevronDown
                  className={`chevron-icon ${userDropdownOpen ? "open" : ""}`}
                />
              </button>
            ) : (
              <div className="auth-buttons-group">
                <Link to="/login" className="login-text-btn">
                  Sign In
                </Link>
                <Link to="/register" className="register-glow-btn">
                  Get Started
                </Link>
              </div>
            )}

            {/* USER DROPDOWN */}
            {user && userDropdownOpen && (
              <div className="user-dropdown-card">
                <div className="user-dropdown-info">
                  <p className="user-email-text">{user.email}</p>
                  <span className="verified-status">
                    <FiCheckCircle /> Verified Member
                  </span>
                </div>

                <div className="dropdown-divider" />

                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <FiUser /> My Profile
                </Link>

                <Link
                  to="/myorders"
                  className="dropdown-item"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <FiPackage /> Order History & Tracking
                </Link>

                <Link
                  to="/wishlist"
                  className="dropdown-item"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <FiHeart /> Saved Wishlist ({wishlistCount})
                </Link>

                {user.role === "admin" && (
                  <>
                    <div className="dropdown-divider" />
                    <Link
                      to="/admin"
                      className="dropdown-item admin-link"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <FiShield /> Admin Dashboard
                    </Link>
                    <Link
                      to="/add-product"
                      className="dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      + Add New Product
                    </Link>
                  </>
                )}

                <div className="dropdown-divider" />

                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FiLogOut /> Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="mobile-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span className="brand-name">
                Shop<span className="brand-highlight">Nest</span>
              </span>
              <button
                className="drawer-close-btn"
                onClick={() => setMenuOpen(false)}
              >
                <FiX />
              </button>
            </div>

            {/* Mobile Search */}
            <form
              className="mobile-search-form"
              onSubmit={handleSearchSubmit}
            >
              <FiSearch />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <div className="mobile-drawer-links">
              <NavLink
                to="/"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                <FiHome /> Home
              </NavLink>

              <NavLink
                to="/shop"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                <FiGrid /> Shop All Categories
              </NavLink>

              <NavLink
                to="/wishlist"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                <FiHeart /> My Wishlist ({wishlistCount})
              </NavLink>

              <NavLink
                to="/cart"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                <FiShoppingCart /> Cart ({totalCartCount})
              </NavLink>

              {user ? (
                <>
                  <div className="drawer-section-title">My Account</div>
                  <NavLink
                    to="/profile"
                    className="mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FiUser /> Profile ({user.name})
                  </NavLink>
                  <NavLink
                    to="/myorders"
                    className="mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FiPackage /> Orders & Tracking
                  </NavLink>

                  {user.role === "admin" && (
                    <NavLink
                      to="/admin"
                      className="mobile-link admin-highlight"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FiShield /> Admin Suite
                    </NavLink>
                  )}

                  <button className="mobile-logout-btn" onClick={handleLogout}>
                    <FiLogOut /> Sign Out
                  </button>
                </>
              ) : (
                <div className="mobile-auth-actions">
                  <Link
                    to="/login"
                    className="btn-secondary"
                    style={{ width: "100%" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                  <button
                    type="button"
                    className="demo-admin-pill"
                    onClick={() => {
                      handleDemoAdminLogin();
                      setMenuOpen(false);
                    }}
                  >
                    ⚡ Quick Admin Demo Mode
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;