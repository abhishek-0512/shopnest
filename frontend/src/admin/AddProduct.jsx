import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { productService } from "../utils/api";
import {
  FiArrowLeft,
  FiUploadCloud,
  FiPackage,
  FiImage,
} from "react-icons/fi";

import { toast } from "react-toastify";
import "../styles/addproduct.css";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "electronics",
    brand: "",
    stock: "15",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageMode, setImageMode] = useState("url"); // 'url' | 'file'
  const [loading, setLoading] = useState(false);

  // Dynamic Specs
  const [spec1Key, setSpec1Key] = useState("Feature");
  const [spec1Val, setSpec1Val] = useState("");
  const [spec2Key, setSpec2Key] = useState("Warranty");
  const [spec2Val, setSpec2Val] = useState("1 Year Brand Warranty");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.brand) {
      toast.error("Please fill in all required fields");
      return;
    }

    const finalImage = imageMode === "url" ? formData.imageUrl : imagePreview;
    if (!finalImage && !imageFile) {
      toast.error("Please provide a product image URL or upload an image file");
      return;
    }

    setLoading(true);

    try {
      const attributes = {};
      if (spec1Val) attributes[spec1Key] = spec1Val;
      if (spec2Val) attributes[spec2Key] = spec2Val;

      let payload;
      if (imageFile && imageMode === "file") {
        payload = new FormData();
        payload.append("name", formData.name);
        payload.append("description", formData.description);
        payload.append("price", formData.price);
        payload.append("category", formData.category);
        payload.append("brand", formData.brand);
        payload.append("stock", formData.stock);
        payload.append("image", imageFile);
        payload.append("attributes", JSON.stringify(attributes));
      } else {
        payload = {
          ...formData,
          imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
          attributes,
        };
      }

      await productService.create(payload);
      toast.success("🎉 Product published successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page" style={{ maxWidth: "900px" }}>
      <div className="cart-header-title">
        <Link to="/admin/products" className="continue-shopping-link" style={{ marginBottom: "6px" }}>
          <FiArrowLeft /> Back to Catalog
        </Link>
        <h1>
          Add New <span className="gradient-text">Product</span>
        </h1>
        <p>Publish a new flagship item to the store catalog with specifications.</p>
      </div>

      <div className="glass-panel" style={{ padding: "36px" }}>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group full-width">
            <label>Product Title *</label>
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="e.g. Sony WH-1000XM5 Noise Cancelling Headphones"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="address-form-grid" style={{ gridColumn: "span 2" }}>
            <div className="form-group">
              <label>Brand Name *</label>
              <input
                type="text"
                name="brand"
                className="input-field"
                placeholder="e.g. Sony, Apple, Nike"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department Category *</label>
              <select
                name="category"
                className="select-field"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="electronics">Electronics & Audio</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="sports">Sports & Performance</option>
                <option value="medicines">Medicines & Health</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₹ INR) *</label>
              <input
                type="number"
                name="price"
                className="input-field"
                placeholder="e.g. 26990"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Available Stock Units *</label>
              <input
                type="number"
                name="stock"
                className="input-field"
                placeholder="e.g. 25"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Detailed Description</label>
            <textarea
              name="description"
              className="textarea-field"
              rows="4"
              placeholder="Highlight the key materials, features, performance specs, and warranty details..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* IMAGE UPLOADER */}
          <div className="form-group full-width">
            <label>Product Imagery</label>
            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
              <button
                type="button"
                className={`btn-secondary ${imageMode === "url" ? "active" : ""}`}
                style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                onClick={() => setImageMode("url")}
              >
                <FiImage /> Image Web URL
              </button>
              <button
                type="button"
                className={`btn-secondary ${imageMode === "file" ? "active" : ""}`}
                style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                onClick={() => setImageMode("file")}
              >
                <FiUploadCloud /> Upload Local File
              </button>
            </div>

            {imageMode === "url" ? (
              <input
                type="url"
                name="imageUrl"
                className="input-field"
                placeholder="Paste high-res Unsplash or image URL (https://...)"
                value={formData.imageUrl}
                onChange={(e) => {
                  handleChange(e);
                  setImagePreview(e.target.value);
                }}
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                className="input-field"
                onChange={handleFileChange}
              />
            )}

            {imagePreview && (
              <div style={{ marginTop: "12px", width: "120px", height: "120px", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border-accent)" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          {/* DYNAMIC SPECIFICATIONS */}
          <div className="form-group full-width">
            <label>Product Specifications & Attributes</label>
            <div className="address-form-grid">
              <div className="form-group">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Spec name (e.g. Battery / Size / Color)"
                  value={spec1Key}
                  onChange={(e) => setSpec1Key(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Value (e.g. 30 Hours / Medium / Blue)"
                  value={spec1Val}
                  onChange={(e) => setSpec1Val(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "16px", fontSize: "1rem", marginTop: "12px" }}
            disabled={loading}
          >
            <FiPackage /> {loading ? "Publishing Product..." : "Publish Product to Store"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;