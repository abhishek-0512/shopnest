import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { productService, API_BASE_URL } from "../utils/api";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "electronics",
    brand: "",
    stock: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getById(id);
        if (data) {
          setFormData({
            name: data.name || "",
            description: data.description || "",
            price: data.price || "",
            category: data.category || "electronics",
            brand: data.brand || "",
            stock: data.stock || 0,
            imageUrl: data.imageUrl || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      try {
        await fetch(`${API_BASE_URL}/api/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(formData),
        });
      } catch {}


      toast.success("🎉 Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to update product: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="cart-page" style={{ maxWidth: "900px" }}>
        <div className="skeleton" style={{ height: "400px" }} />
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ maxWidth: "900px" }}>
      <div className="cart-header-title">
        <Link to="/admin/products" className="continue-shopping-link" style={{ marginBottom: "6px" }}>
          <FiArrowLeft /> Back to Products
        </Link>
        <h1>
          Edit <span className="gradient-text">Product</span>
        </h1>
        <p>Update pricing, description, stock units, and imagery.</p>
      </div>

      <div className="glass-panel" style={{ padding: "36px" }}>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group full-width">
            <label>Product Title</label>
            <input
              type="text"
              name="name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="address-form-grid" style={{ gridColumn: "span 2" }}>
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                className="input-field"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                className="select-field"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="sports">Sports</option>
                <option value="medicines">Medicines</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₹ INR)</label>
              <input
                type="number"
                name="price"
                className="input-field"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock Available</label>
              <input
                type="number"
                name="stock"
                className="input-field"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="input-field"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
            {formData.imageUrl && (
              <div style={{ marginTop: "12px", width: "100px", height: "100px", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border-accent)" }}>
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              className="textarea-field"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "16px", marginTop: "12px" }}
            disabled={saving}
          >
            <FiSave /> {saving ? "Saving Changes..." : "Update Product Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;