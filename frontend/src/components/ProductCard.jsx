import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import {
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiEye,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import { toast } from "react-toastify";
import QuickViewModal from "./QuickViewModal";
import "../styles/product.css";

const BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist?.items) || [];
  const isWishlisted = wishlistItems.some(
    (item) => item.productId === product?._id
  );

  if (!product) return null;

  const imageSrc = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${BACKEND_URL}${product.imageUrl}`
    : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80";

  const isAvailable = product.stock !== undefined ? product.stock > 0 : true;

  // Calculate discount percentage if original price is available
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAvailable) {
      toast.error("Product is out of stock");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: imageSrc,
        brand: product.brand,
        stock: product.stock || 10,
        qty: 1,
      })
    );

    toast.success(`Added "${product.name}" to cart! 🛒`);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.info("Removed from wishlist");
    } else {
      dispatch(
        addToWishlist({
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: imageSrc,
          brand: product.brand,
          stock: product.stock || 10,
        })
      );
      toast.success("Added to wishlist! ❤️");
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <div className="product-card glass-panel glass-panel-hover">
        {/* CARD BADGES */}
        <div className="product-card-badges">
          {product.badge ? (
            <span className="badge badge-primary">{product.badge}</span>
          ) : discount ? (
            <span className="badge badge-amber">{discount}% OFF</span>
          ) : (
            <span className="badge badge-primary">NEW</span>
          )}

          <button
            type="button"
            className={`card-wishlist-btn ${isWishlisted ? "active" : ""}`}
            onClick={handleWishlistToggle}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FiHeart />
          </button>
        </div>

        {/* IMAGE */}
        <Link to={`/product/${product._id}`} className="card-image-wrap">
          <img
            src={imageSrc}
            alt={product.name}
            className="card-product-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80";
            }}
          />

          {/* Quick View Button Hover Overlay */}
          <button
            type="button"
            className="card-quick-view-overlay-btn"
            onClick={handleQuickView}
          >
            <FiEye /> Quick View
          </button>
        </Link>

        {/* DETAILS */}
        <div className="card-body">
          <div className="card-meta-row">
            <span className="card-brand">{product.brand || "ShopNest"}</span>
            <div className="card-rating">
              <FiStar className="star-icon" />
              <span>{product.rating || "4.8"}</span>
              {product.numReviews > 0 && (
                <span className="num-reviews">({product.numReviews})</span>
              )}
            </div>
          </div>

          <Link to={`/product/${product._id}`} className="card-title-link">
            <h3 className="card-title" title={product.name}>
              {product.name}
            </h3>
          </Link>

          <div className="card-price-row">
            <div className="price-group">
              <span className="current-price">
                ₹{Number(product.price || 0).toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="old-price">
                  ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <span
              className={`stock-pill ${
                isAvailable ? "in-stock" : "out-of-stock"
              }`}
            >
              {isAvailable ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="card-actions">
            <button
              type="button"
              className="btn-card-cart"
              onClick={handleAddToCart}
              disabled={!isAvailable}
            >
              <FiShoppingBag />
              {isAvailable ? "Add to Cart" : "Sold Out"}
            </button>

            <Link
              to={`/product/${product._id}`}
              className="btn-card-details"
              title="View Product Details"
            >
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {quickViewOpen && (
        <QuickViewModal
          product={{ ...product, imageUrl: imageSrc }}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;