import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import {
  FiX,
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiArrowRight,
  FiCheck,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { toast } from "react-toastify";

const QuickViewModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const wishlistItems = useSelector((state) => state.wishlist?.items) || [];
  const isWishlisted = wishlistItems.some(
    (item) => item.productId === product?._id
  );

  if (!product) return null;

  const isAvailable = product.stock > 0;

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error("Product is currently out of stock");
      return;
    }
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        brand: product.brand,
        stock: product.stock,
        qty: quantity,
      })
    );
    toast.success(`Added ${quantity}x "${product.name}" to cart! 🛒`);
    onClose();
  };

  const handleBuyNow = () => {
    if (!isAvailable) {
      toast.error("Product is currently out of stock");
      return;
    }
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        brand: product.brand,
        stock: product.stock,
        qty: quantity,
      })
    );
    onClose();
    navigate("/checkout");
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.info("Removed from wishlist");
    } else {
      dispatch(
        addToWishlist({
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          brand: product.brand,
          stock: product.stock,
        })
      );
      toast.success("Saved to wishlist! ❤️");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="quick-view-card glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="quick-view-grid">
          {/* IMAGE */}
          <div className="quick-view-image-box">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="quick-view-img"
            />
            {product.badge && (
              <span className="quick-view-badge badge badge-primary">
                {product.badge}
              </span>
            )}
          </div>

          {/* DETAILS */}
          <div className="quick-view-info">
            <div className="quick-view-top-row">
              <span className="brand-pill">{product.brand}</span>
              <span className="category-pill">{product.category}</span>
            </div>

            <h2 className="quick-view-title">{product.name}</h2>

            <div className="quick-view-rating-row">
              <div className="rating-pill">
                <FiStar className="star-filled" />
                <span>{product.rating || 4.8}</span>
              </div>
              <span className="review-count-text">
                ({product.numReviews || 12} customer reviews)
              </span>
            </div>

            <div className="quick-view-price-row">
              <span className="quick-price">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="quick-old-price">
                  ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                </span>
              )}
              <span
                className={`stock-indicator ${
                  isAvailable ? "in-stock" : "out-of-stock"
                }`}
              >
                {isAvailable ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>

            <p className="quick-desc">{product.description}</p>

            {/* SPECS/ATTRIBUTES */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <div className="quick-specs-grid">
                {Object.entries(product.attributes)
                  .slice(0, 3)
                  .map(([key, val]) => (
                    <div key={key} className="quick-spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-val">{String(val)}</span>
                    </div>
                  ))}
              </div>
            )}

            {/* QUANTITY & ACTIONS */}
            {isAvailable && (
              <div className="quick-actions-row">
                <div className="qty-stepper">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    disabled={quantity >= product.stock}
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn-primary flex-1"
                  onClick={handleAddToCart}
                >
                  <FiShoppingBag /> Add to Cart
                </button>

                <button
                  className={`wishlist-icon-btn ${isWishlisted ? "active" : ""}`}
                  onClick={handleWishlistToggle}
                  title="Wishlist"
                >
                  <FiHeart />
                </button>
              </div>
            )}

            <div className="quick-footer-row">
              <button
                className="btn-secondary buy-now-full"
                onClick={handleBuyNow}
                disabled={!isAvailable}
              >
                ⚡ Buy Now with 1-Click
              </button>
              <Link
                to={`/product/${product._id}`}
                className="view-full-page-link"
                onClick={onClose}
              >
                View Full Details <FiArrowRight />
              </Link>
            </div>

            {/* TRUST BADGES */}
            <div className="quick-trust-row">
              <span>
                <FiTruck /> Express 2-Day Delivery
              </span>
              <span>
                <FiShield /> 1-Year Official Warranty
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
