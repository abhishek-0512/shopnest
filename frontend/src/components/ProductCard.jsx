import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiStar,
  FiShoppingBag,
} from "react-icons/fi";
import "../styles/product.css";

const BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const imageSrc = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${BACKEND_URL}${product.imageUrl}`
    : "/placeholder.png";

  const isAvailable =
    product.stock !== undefined
      ? product.stock > 0
      : product.countInStock !== undefined
      ? product.countInStock > 0
      : true;

  return (
    <div className="product-card">
      {/* Badges */}
      <div className="badge-row">
        <span className="new-badge">NEW</span>

        <span className="rating-badge">
          <FiStar />
          {product.rating || "4.8"}
        </span>
      </div>

      {/* Image */}
      <div className="product-image-container">
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
      </div>

      {/* Content */}
      <div className="product-info">
        <p className="brand">{product.brand}</p>

        <h3 title={product.name}>{product.name}</h3>

        <div className="price-row">
          <span className="price">
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </span>

          <span
            className={`status ${
              isAvailable ? "in-stock" : "out-of-stock"
            }`}
          >
            {isAvailable ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <Link
          to={`/product/${product._id}`}
          className="btn"
        >
          <FiShoppingBag />
          View Details
          <FiArrowRight className="arrow" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;