import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Submit clicked");

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("stock", formData.stock);
      data.append("image", image);

      console.log("📦 Sending request to:", `${API_URL}/api/products`);

      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const result = await res.json();

      console.log("📥 RESPONSE STATUS:", res.status);
      console.log("📥 RESPONSE DATA:", result);

      if (!res.ok) {
        alert(result.message || "Failed to create product");
        return;
      }

      alert("Product created successfully 🚀");

      navigate("/shop");
    } catch (err) {
      console.error("❌ ERROR:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#f97316" }}>Add New Product</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="name" placeholder="Product Name" onChange={handleChange} required style={inputStyle} />

        <textarea name="description" placeholder="Description" onChange={handleChange} required style={inputStyle} />

        <input name="price" type="number" placeholder="Price" onChange={handleChange} required style={inputStyle} />

        <input name="category" placeholder="Category" onChange={handleChange} required style={inputStyle} />

        <input name="brand" placeholder="Brand" onChange={handleChange} required style={inputStyle} />

        <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required style={inputStyle} />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  background: "#18181b",
  padding: "30px",
  borderRadius: "10px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  padding: "12px",
  background: "#09090b",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "6px",
};

export default AddProduct;