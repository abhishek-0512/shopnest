import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { productService } from "../utils/api";
import {
  FiPackage,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiArrowLeft,
} from "react-icons/fi";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [user, navigate]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await productService.delete(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success(`Product "${name}" deleted successfully`);
      } catch (err) {
        toast.error("Failed to delete product: " + err.message);
      }
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cart-page">
      <div className="cart-header-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Link to="/admin" className="continue-shopping-link" style={{ marginBottom: "6px" }}>
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <h1>
            Manage <span className="gradient-text">Products Catalog</span>
          </h1>
          <p>Create, update prices, manage stock quantities, and remove products.</p>
        </div>

        <Link to="/add-product" className="btn-primary">
          <FiPlus /> Add New Product
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="glass-panel" style={{ padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <FiSearch style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Filter catalog by product name, category, or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ background: "transparent", border: "none", color: "#fff", outline: "none", width: "100%", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
        />
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="skeleton" style={{ height: "400px" }} />
      ) : (
        <div className="glass-panel" style={{ overflowX: "auto", padding: "0" }}>
          <table className="invoice-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover" }}
                        />
                        <div>
                          <strong style={{ color: "#fff", display: "block" }}>{p.name}</strong>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>ID: {p._id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ textTransform: "capitalize", color: "var(--text-secondary)" }}>
                      {p.category}
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{p.brand}</td>
                    <td>
                      <strong style={{ color: "var(--primary-light)" }}>
                        ₹{Number(p.price || 0).toLocaleString("en-IN")}
                      </strong>
                    </td>
                    <td>
                      <span className={`stock-pill ${p.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                        {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                      </span>
                    </td>
                    <td style={{ color: "#f59e0b", fontWeight: "700" }}>{p.rating || "4.8"} ★</td>
                    <td className="text-right">
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <Link
                          to={`/admin/edit-product/${p._id}`}
                          className="btn-secondary"
                          style={{ padding: "6px 12px", fontSize: "0.82rem" }}
                          title="Edit product"
                        >
                          <FiEdit />
                        </Link>
                        <button
                          type="button"
                          className="btn-danger"
                          style={{ padding: "6px 12px", fontSize: "0.82rem" }}
                          onClick={() => handleDelete(p._id, p.name)}
                          title="Delete product"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                    No matching products found in catalog.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;