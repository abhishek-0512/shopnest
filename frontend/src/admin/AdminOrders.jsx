import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { orderService } from "../utils/api";
import InvoiceModal from "../components/InvoiceModal";
import {
  FiArrowLeft,
  FiFileText,
} from "react-icons/fi";

import { toast } from "react-toastify";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getAllAdmin();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [user, navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      toast.success(`Order #${orderId} status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status: " + err.message);
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === filterStatus);

  return (
    <div className="cart-page">
      <div className="cart-header-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Link to="/admin" className="continue-shopping-link" style={{ marginBottom: "6px" }}>
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <h1>
            Customer <span className="gradient-text">Orders & Fulfillment</span>
          </h1>
          <p>Update order tracking milestones, manage deliveries, and view invoices.</p>
        </div>

        {/* STATUS FILTER */}
        <select
          className="select-field"
          style={{ width: "200px" }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses ({orders.length})</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="skeleton" style={{ height: "400px" }} />
      ) : (
        <div className="glass-panel" style={{ overflowX: "auto", padding: 0 }}>
          <table className="invoice-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status Milestone</th>
                <th className="text-right">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <strong style={{ color: "#fff", fontSize: "0.85rem" }}>
                        #{order._id}
                      </strong>
                    </td>
                    <td>
                      <div>
                        <strong style={{ color: "#fff", display: "block" }}>
                          {order.shippingAddress?.fullName || order.user?.name || "Customer"}
                        </strong>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {order.shippingAddress?.city}, {order.shippingAddress?.state}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.85rem" }}>
                        {(order.orderItems || []).length} items
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: "var(--emerald)" }}>
                        ₹{Number(order.totalPrice || order.totalAmount || 0).toLocaleString("en-IN")}
                      </strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          order.paymentStatus === "Paid"
                            ? "badge-emerald"
                            : "badge-amber"
                        }`}
                      >
                        {order.paymentStatus || "PAID"}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td>
                      <select
                        className="select-field"
                        style={{ padding: "6px 10px", fontSize: "0.82rem", width: "140px" }}
                        value={order.orderStatus || "Processing"}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "0.82rem" }}
                        onClick={() => setSelectedInvoiceOrder(order)}
                        title="Print invoice"
                      >
                        <FiFileText /> Invoice
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                    No orders found matching this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};

export default AdminOrders;