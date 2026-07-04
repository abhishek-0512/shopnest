import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/logo.png"
            alt="ShopNest Logo"
            className="navbar-logo"
          />
          <span>ShopNest</span>
        </NavLink>
      </div>

      <button
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>
        </li>

        <li>
          <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
            Cart
            <span className="cart-count">{cartItems.length}</span>
          </NavLink>
        </li>

        {user ? (
          <>
            <li>
              <NavLink to="/myorders" onClick={() => setMenuOpen(false)}>
                {user.name}
              </NavLink>
            </li>

            {user.role === "admin" && (
              <li>
                <NavLink to="/add-product" onClick={() => setMenuOpen(false)}>
                  Add Product
                </NavLink>
              </li>
            )}

            <li>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;