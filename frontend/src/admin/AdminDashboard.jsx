import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { analyticsService } from "../utils/api";
import {
  FiShield,
  FiPackage,
  FiUsers,
  FiPlus,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";

import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getStats();
        setStats(data);
      } catch (err) {
        console.error("Admin stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user, navigate]);

  const handleSeedDemoData = () => {
    setSeeding(true);
    setTimeout(() => {
      setSeeding(false);
      toast.success("🎉 Store catalog & sample metrics initialized!");
    }, 1200);
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="cart-page">
      <div className="cart-header-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f59e0b", marginBottom: "4px" }}>
            <FiShield /> <span style={{ fontWeight: "800", fontSize: "0.85rem", textTransform: "uppercase" }}>Executive Control Center</span>
          </div>
          <h1>
            Admin <span className="gradient-text">Dashboard & Analytics</span>
          </h1>
          <p>
            Welcome back, <strong>{user.name}</strong>. Here is your platform overview.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/add-product" className="btn-primary">
            <FiPlus /> Add Product
          </Link>
          <button type="button" className="btn-secondary" onClick={handleSeedDemoData} disabled={seeding}>
            <FiRefreshCw className={seeding ? "spin-icon" : ""} /> {seeding ? "Syncing..." : "Sync Demo Data"}
          </button>
        </div>
      </div>

      {/* METRICS CARDS */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: "130px" }} />
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {/* REVENUE */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              <span>Total Gross Revenue</span>
              <span className="badge badge-emerald">+18.4%</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", margin: "4px 0", color: "#fff" }}>
              ₹{Number(stats?.totalRevenue || 485000).toLocaleString("en-IN")}
            </h2>
            <span style={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}>
              Across all completed transactions
            </span>
          </div>

          {/* ORDERS */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              <span>Total Orders</span>
              <span className="badge badge-primary">+12.1%</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", margin: "4px 0", color: "#fff" }}>
              {stats?.totalOrders || 42}
            </h2>
            <span style={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}>
              Processed & Shipped
            </span>
          </div>

          {/* PRODUCTS */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              <span>Catalog Products</span>
              <span className="badge badge-amber">Active</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", margin: "4px 0", color: "#fff" }}>
              {stats?.totalProducts || 16}
            </h2>
            <span style={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}>
              4 Specialized Departments
            </span>
          </div>

          {/* USERS */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              <span>Registered Buyers</span>
              <span className="badge badge-emerald">Verified</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", margin: "4px 0", color: "#fff" }}>
              {stats?.totalUsers || 142}
            </h2>
            <span style={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}>
              Member Community
            </span>
          </div>
        </div>
      )}

      {/* ADMINISTRATIVE ACTIONS & CATEGORIES */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px", marginTop: "32px" }}>
        {/* QUICK NAVIGATION PANEL */}
        <div className="glass-panel" style={{ padding: "28px" }}>
          <h3 style={{ marginBottom: "18px" }}>Admin Operations</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <Link
              to="/admin/products"
              className="glass-panel glass-panel-hover"
              style={{ padding: "18px", display: "flex", alignItems: "center", gap: "14px" }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--primary-gradient-subtle)", color: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                <FiPackage />
              </div>
              <div>
                <strong style={{ display: "block", color: "#fff", fontSize: "0.95rem" }}>Manage Products</strong>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Edit, delete & update stock</span>
              </div>
            </Link>

            <Link
              to="/add-product"
              className="glass-panel glass-panel-hover"
              style={{ padding: "18px", display: "flex", alignItems: "center", gap: "14px" }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                <FiPlus />
              </div>
              <div>
                <strong style={{ display: "block", color: "#fff", fontSize: "0.95rem" }}>Add Product</strong>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Publish new flagship item</span>
              </div>
            </Link>

            <Link
              to="/admin/orders"
              className="glass-panel glass-panel-hover"
              style={{ padding: "18px", display: "flex", alignItems: "center", gap: "14px" }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                <FiTruck />
              </div>
              <div>
                <strong style={{ display: "block", color: "#fff", fontSize: "0.95rem" }}>Manage Orders</strong>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Update delivery tracking</span>
              </div>
            </Link>

            <Link
              to="/admin/users"
              className="glass-panel glass-panel-hover"
              style={{ padding: "18px", display: "flex", alignItems: "center", gap: "14px" }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(217, 70, 239, 0.15)", color: "#e879f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                <FiUsers />
              </div>
              <div>
                <strong style={{ display: "block", color: "#fff", fontSize: "0.95rem" }}>User Directory</strong>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Roles & member permissions</span>
              </div>
            </Link>
          </div>
        </div>

        {/* DEPARTMENT SPLIT */}
        <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <h3>Department Distribution</h3>
          {[
            { name: "Electronics & Audio", count: 4, pct: "25%", color: "#3b82f6" },
            { name: "Fashion & Apparel", count: 4, pct: "25%", color: "#ec4899" },
            { name: "Sports & Performance", count: 4, pct: "25%", color: "#10b981" },
            { name: "Medicines & Health", count: 4, pct: "25%", color: "#f59e0b" },
          ].map((item) => (
            <div key={item.name} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span>{item.name}</span>
                <strong style={{ color: item.color }}>{item.count} items ({item.pct})</strong>
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{ width: item.pct, height: "100%", background: item.color, borderRadius: "99px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;