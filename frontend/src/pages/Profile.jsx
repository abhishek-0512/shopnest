import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }
          setOrders([]);
          return;
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div style={container}>
      {/* PROFILE HEADER */}
      <div style={header}>
        <div>
          <h2 style={{ fontSize: "2rem", color: "#fff" }}>
            My Profile
          </h2>

          <p style={text}>
            <strong>Name:</strong> {user.name}
          </p>

          <p style={text}>
            <strong>Email:</strong> {user.email}
          </p>

          <span style={badge}>
            Account: {user.role?.toUpperCase()}
          </span>
        </div>

        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* ORDERS */}
      <h3 style={title}>Order History</h3>

      {loading ? (
        <p style={muted}>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div style={emptyBox}>
          <p style={muted}>No orders found.</p>
          <Link to="/shop" style={btn}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {orders.map((order) => (
            <div key={order._id} style={orderCard}>
              <div>
                <p style={muted}>
                  Order ID: <span style={white}>{order._id}</span>
                </p>

                <p style={muted}>
                  Date:{" "}
                  <span style={white}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <p style={muted}>
                  Total:{" "}
                  <strong style={{ color: "#10b981" }}>
                    ₹{Number(order.totalAmount || 0).toFixed(2)}
                  </strong>
                </p>
              </div>

              <span style={getStatusStyle(order.status)}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* STYLES */
const container = {
  maxWidth: "1000px",
  margin: "40px auto",
  padding: "30px",
  background: "#18181b",
  borderRadius: "12px",
  color: "#fafafa",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  paddingBottom: "25px",
  marginBottom: "25px",
};

const title = {
  color: "#f97316",
  marginBottom: "20px",
};

const text = {
  color: "#a1a1aa",
  marginBottom: "8px",
};

const badge = {
  background: "rgba(249,115,22,0.1)",
  color: "#f97316",
  padding: "6px 12px",
  borderRadius: "8px",
  display: "inline-block",
  marginTop: "10px",
};

const logoutBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const emptyBox = {
  textAlign: "center",
  padding: "30px",
  background: "#09090b",
  borderRadius: "8px",
  border: "1px solid #27272a",
};

const btn = {
  display: "inline-block",
  marginTop: "10px",
  padding: "10px 16px",
  background: "#f97316",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
};

const orderCard = {
  background: "#09090b",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #27272a",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const muted = {
  color: "#a1a1aa",
};

const white = {
  color: "#fff",
};

const getStatusStyle = (status) => ({
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
  background:
    status === "Delivered"
      ? "rgba(16,185,129,0.1)"
      : status === "Shipped"
      ? "rgba(59,130,246,0.1)"
      : "rgba(245,158,11,0.1)",
  color:
    status === "Delivered"
      ? "#10b981"
      : status === "Shipped"
      ? "#3b82f6"
      : "#f59e0b",
});

export default Profile;