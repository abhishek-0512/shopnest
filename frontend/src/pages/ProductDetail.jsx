import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/product.css";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getImageSrc = (imageUrl) => {
  if (!imageUrl) return "/placeholder.png";
  return imageUrl.startsWith("http") ? imageUrl : `${BACKEND_URL}${imageUrl}`;
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl, // raw path, resolved at render time in Cart/ProductCard
        stock: product.stock,
        qty: 1,
      })
    );

    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div style={loadingStyle}>Loading Product...</div>;
  }

  if (!product) {
    return <div style={errorStyle}>Product Not Found</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={breadcrumb}>
        <Link to="/">Home</Link> /{" "}
        <Link to="/shop">Shop</Link> /{" "}
        <span>{product.category}</span> /{" "}
        <span style={{ color: "#fff" }}>{product.name}</span>
      </div>

      <div className="product-detail">
        <div className="detail-image-container">
          <img
            src={getImageSrc(product.imageUrl)}
            alt={product.name}
            className="detail-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.png";
            }}
          />
        </div>

        <div className="detail-info">
          <h2 style={title}>{product.name}</h2>

          <p style={price}>
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </p>

          <p
            style={{
              color: product.stock > 0 ? "#10b981" : "#ef4444",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          <div style={descBox}>
            <h4 style={{ color: "#fff", marginBottom: "10px" }}>
              Description
            </h4>

            <p
              style={{
                color: "#a1a1aa",
                lineHeight: "1.7",
              }}
            >
              {product.description}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              ...btn,
              opacity: product.stock > 0 ? 1 : 0.6,
              cursor: product.stock > 0 ? "pointer" : "not-allowed",
            }}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};

const breadcrumb = {
  color: "#a1a1aa",
  marginBottom: "20px",
};

const loadingStyle = {
  textAlign: "center",
  marginTop: "100px",
  color: "#f97316",
};

const errorStyle = {
  textAlign: "center",
  marginTop: "100px",
  color: "#ef4444",
};

const title = {
  fontSize: "2.5rem",
  marginBottom: "10px",
};

const price = {
  fontSize: "2rem",
  margin: "15px 0",
  color: "#f97316",
};

const descBox = {
  marginBottom: "25px",
};

const btn = {
  width: "100%",
  padding: "15px",
  background: "#f97316",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1.1rem",
  fontWeight: "600",
};

export default ProductDetail;