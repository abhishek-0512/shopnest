import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { orderService } from "../utils/api";
import {
  FiUser,
  FiMapPin,
  FiPackage,
  FiHeart,
  FiShield,
  FiLogOut,
  FiEdit2,
  FiSave,
} from "react-icons/fi";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile"); // profile | address | orders


  // Editable Profile state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "Abhishek Gangwar");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [street, setStreet] = useState("Flat 402, Signature Towers, Cyber City");
  const [city, setCity] = useState("Gurugram");
  const [state, setState] = useState("Haryana");
  const [pincode, setPincode] = useState("122002");

  const wishlistCount = useSelector((state) => state.wishlist?.items?.length) || 0;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const totalSpent = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    const updatedUser = {
      ...user,
      name,
      phone,
    };
    login(updatedUser);
    setIsEditing(false);
    toast.success("Profile details updated successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="cart-page">
      <div className="cart-header-title">
        <h1>
          My <span className="gradient-text">Account Hub</span>
        </h1>
        <p>Manage your personal profile, addresses, security preferences, and order history.</p>
      </div>

      <div className="checkout-grid-layout" style={{ gridTemplateColumns: "320px 1fr" }}>
        {/* LEFT COLUMN: USER AVATAR & QUICK STATS */}
        <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "var(--primary-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: "900",
                color: "#fff",
                boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)",
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <div>
              <h3 style={{ margin: "4px 0" }}>{user.name}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                {user.email}
              </p>
            </div>

            <span className={`badge ${user.role === "admin" ? "badge-amber" : "badge-emerald"}`}>
              {user.role === "admin" ? "★ Administrator" : "✓ Verified Member"}
            </span>
          </div>

          <div style={{ height: "1px", background: "var(--border-glass)" }} />

          {/* QUICK METRICS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Total Orders:</span>
              <strong style={{ color: "#fff" }}>{orders.length}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Total Spent:</span>
              <strong className="text-emerald">₹{totalSpent.toLocaleString("en-IN")}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Saved Wishlist:</span>
              <strong style={{ color: "var(--primary-light)" }}>{wishlistCount} items</strong>
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-glass)" }} />

          {/* TAB BUTTONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              type="button"
              className={`dropdown-item ${activeTab === "profile" ? "admin-link" : ""}`}
              style={{ background: activeTab === "profile" ? "rgba(99, 102, 241, 0.15)" : "transparent" }}
              onClick={() => setActiveTab("profile")}
            >
              <FiUser /> Personal Details
            </button>

            <button
              type="button"
              className={`dropdown-item ${activeTab === "address" ? "admin-link" : ""}`}
              style={{ background: activeTab === "address" ? "rgba(99, 102, 241, 0.15)" : "transparent" }}
              onClick={() => setActiveTab("address")}
            >
              <FiMapPin /> Saved Addresses
            </button>

            <Link to="/myorders" className="dropdown-item">
              <FiPackage /> My Orders ({orders.length})
            </Link>

            <Link to="/wishlist" className="dropdown-item">
              <FiHeart /> Wishlist ({wishlistCount})
            </Link>

            {user.role === "admin" && (
              <Link to="/admin" className="dropdown-item admin-link">
                <FiShield /> Admin Suite
              </Link>
            )}

            <button
              type="button"
              className="dropdown-item logout"
              onClick={handleLogout}
              style={{ marginTop: "10px" }}
            >
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: TAB CONTENT */}
        <div className="glass-panel" style={{ padding: "32px" }}>
          {activeTab === "profile" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px" }}>Personal Details</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                    Keep your primary contact info up to date for deliveries.
                  </p>
                </div>

                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FiEdit2 /> {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="address-form-grid">
                <div className="form-group full-width">
                  <label>Full Legal Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Registered Email Address</label>
                  <input
                    type="email"
                    className="input-field"
                    value={user.email}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Contact Phone Number</label>
                  <input
                    type="text"
                    className="input-field"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <div className="form-group full-width" style={{ marginTop: "10px" }}>
                    <button type="submit" className="btn-primary" style={{ width: "fit-content" }}>
                      <FiSave /> Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {activeTab === "address" && (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ margin: "0 0 4px" }}>Default Delivery Address</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                  This address will be auto-filled during checkout.
                </p>
              </div>

              <div className="address-form-grid">
                <div className="form-group full-width">
                  <label>Street & Building</label>
                  <input
                    type="text"
                    className="input-field"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="input-field"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    className="input-field"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    className="input-field"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>

                <div className="form-group full-width" style={{ marginTop: "10px" }}>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ width: "fit-content" }}
                    onClick={() => toast.success("Default address updated!")}
                  >
                    <FiSave /> Update Address
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;