import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  if (loading) {
    return (
      <div style={loadingStyle}>
        <h2>Loading Users...</h2>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>User Directory</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>EMAIL</th>
              <th style={thStyle}>ROLE</th>
              <th style={thStyle}>JOINED</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} style={rowStyle}>
                  <td style={tdStyle}>
                    {u._id?.substring(0, 8)}...
                  </td>

                  <td style={tdStyle}>{u.name}</td>

                  <td style={tdStyle}>{u.email}</td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          u.role === "admin"
                            ? "rgba(249,115,22,0.2)"
                            : "rgba(16,185,129,0.2)",
                        color:
                          u.role === "admin"
                            ? "#f97316"
                            : "#10b981",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                      }}
                    >
                      {u.role?.toUpperCase()}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#aaa",
                  }}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
  color: "#fff",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
  padding: "30px",
  background: "#18181b",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.05)",
  color: "#fafafa",
};

const titleStyle = {
  color: "#f97316",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const rowStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
  color: "#a1a1aa",
  fontSize: "0.9rem",
};

const tdStyle = {
  padding: "15px",
  textAlign: "left",
};

export default AdminUsers;