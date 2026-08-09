import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import { FiUsers, FiArrowLeft, FiSearch, FiShield, FiCheckCircle } from "react-icons/fi";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      _id: "usr_001",
      name: "Abhishek Gangwar",
      email: "admin@shopnest.com",
      role: "admin",
      verified: true,
      createdAt: "2026-06-15T10:00:00Z",
    },
    {
      _id: "usr_002",
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      role: "user",
      verified: true,
      createdAt: "2026-07-20T14:30:00Z",
    },
    {
      _id: "usr_003",
      name: "Pooja Kapoor",
      email: "pooja.kapoor@example.com",
      role: "user",
      verified: true,
      createdAt: "2026-07-28T09:15:00Z",
    },
    {
      _id: "usr_004",
      name: "Dr. Sandeep Mehta",
      email: "dr.sandeep@hospital.org",
      role: "user",
      verified: true,
      createdAt: "2026-08-01T16:00:00Z",
    },
    {
      _id: "usr_005",
      name: "Devendra Kumar",
      email: "devendra.k@techcorp.in",
      role: "user",
      verified: true,
      createdAt: "2026-08-03T11:45:00Z",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/users`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setUsers(data);
          }
        }
      } catch (e) {
        // Fallback to sample list
      }
    };
    fetchUsers();
  }, [user, navigate]);

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cart-page">
      <div className="cart-header-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Link to="/admin" className="continue-shopping-link" style={{ marginBottom: "6px" }}>
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <h1>
            Customer & Member <span className="gradient-text">Directory</span>
          </h1>
          <p>View registered accounts, administrative roles, and membership statuses.</p>
        </div>

        <span className="badge badge-emerald" style={{ padding: "8px 16px" }}>
          <FiUsers /> Total Members: {users.length}
        </span>
      </div>

      {/* SEARCH */}
      <div className="glass-panel" style={{ padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <FiSearch style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Search members by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ background: "transparent", border: "none", color: "#fff", outline: "none", width: "100%", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
        />
      </div>

      <div className="glass-panel" style={{ overflowX: "auto", padding: 0 }}>
        <table className="invoice-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Email Address</th>
              <th>Account Tier</th>
              <th>Verification</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: u.role === "admin" ? "var(--amber-gradient)" : "var(--primary-gradient)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "800",
                        fontSize: "0.85rem",
                      }}
                    >
                      {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <strong style={{ color: "#fff", display: "block" }}>{u.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>ID: {u._id}</span>
                    </div>
                  </div>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{u.email}</td>
                <td>
                  <span className={`badge ${u.role === "admin" ? "badge-amber" : "badge-primary"}`}>
                    {u.role === "admin" ? "★ Administrator" : "Verified Buyer"}
                  </span>
                </td>
                <td>
                  <span style={{ color: "var(--emerald)", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <FiCheckCircle /> Active Verified
                  </span>
                </td>
                <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  {new Date(u.createdAt || Date.now()).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;