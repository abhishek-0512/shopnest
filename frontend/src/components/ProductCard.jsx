import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ProductCard = ({ product }) => {
  if (!product) return null;

  // Handles both full URLs (e.g. Cloudinary/seeded) and local relative paths (/uploads/...)
  const imageSrc = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${BACKEND_URL}${product.imageUrl}`
    : "/placeholder.png";

  // Stock Status
  const isAvailable =
    product.stock !== undefined
      ? product.stock > 0
      : product.countInStock !== undefined
      ? product.countInStock > 0
      : true;

  return (
    <div className="product-card">
      <img
        src={imageSrc}
        alt={product.name}
        className="product-image"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.png";
        }}
      />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="price">
          ₹{Number(product.price || 0).toLocaleString("en-IN")}
        </p>

        <p className="brand">{product.brand}</p>

        <p className={`status ${isAvailable ? "in-stock" : "out-of-stock"}`}>
          {isAvailable ? "In Stock" : "Out of Stock"}
        </p>

        <Link to={`/product/${product._id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;