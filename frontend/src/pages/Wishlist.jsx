import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromWishlist,
  clearWishlist,
} from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import QuickViewModal from "../components/QuickViewModal";
import {
  FiHeart,
  FiShoppingBag,
  FiTrash2,
  FiEye,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "../styles/wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist?.items) || [];
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleMoveToCart = (product) => {
    dispatch(
      addToCart({
        productId: product.productId || product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        brand: product.brand,
        stock: product.stock || 10,
        qty: 1,
      })
    );
    dispatch(removeFromWishlist(product.productId || product._id));
    toast.success(`Moved "${product.name}" to cart! 🛒`);
  };

  const handleMoveAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((item) => {
      dispatch(
        addToCart({
          productId: item.productId || item._id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          brand: item.brand,
          stock: item.stock || 10,
          qty: 1,
        })
      );
    });
    dispatch(clearWishlist());
    toast.success(`Moved all ${wishlistItems.length} items to shopping cart! 🚀`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-cart-card glass-panel">
          <div className="empty-wishlist-icon">
            <FiHeart />
          </div>
          <h2>Your Wishlist is Empty</h2>
          <p>
            Explore our curated departments and tap the heart icon on any product
            to save it for later.
          </p>
          <Link to="/shop" className="btn-primary">
            <FiShoppingBag /> Discover Products <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header-row">
        <div>
          <h1>
            My Saved <span className="gradient-text">Wishlist</span>
          </h1>
          <p>
            You have {wishlistItems.length} saved items ready to order.
          </p>
        </div>

        <div className="wishlist-header-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleMoveAllToCart}
          >
            <FiShoppingBag /> Move All to Cart
          </button>
          <button
            type="button"
            className="clear-wishlist-btn"
            onClick={() => {
              if (window.confirm("Clear all items from your wishlist?")) {
                dispatch(clearWishlist());
                toast.info("Wishlist cleared");
              }
            }}
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => {
          const prodId = item.productId || item._id;
          const isAvailable = item.stock !== undefined ? item.stock > 0 : true;

          return (
            <div key={prodId} className="wishlist-card glass-panel glass-panel-hover">
              <div className="wishlist-img-box">
                <img src={item.imageUrl} alt={item.name} />
                <button
                  type="button"
                  className="wishlist-delete-btn"
                  onClick={() => {
                    dispatch(removeFromWishlist(prodId));
                    toast.info(`Removed "${item.name}" from wishlist`);
                  }}
                  title="Remove from wishlist"
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="wishlist-card-body">
                <span className="wishlist-brand">{item.brand || "ShopNest"}</span>
                <Link to={`/product/${prodId}`} className="wishlist-title">
                  <h4>{item.name}</h4>
                </Link>

                <div className="wishlist-price-row">
                  <span className="wishlist-price">
                    ₹{Number(item.price || 0).toLocaleString("en-IN")}
                  </span>
                  <span
                    className={`stock-pill ${
                      isAvailable ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    {isAvailable ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="wishlist-actions-group">
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ flex: 1, padding: "10px" }}
                    onClick={() => handleMoveToCart(item)}
                    disabled={!isAvailable}
                  >
                    <FiShoppingBag /> {isAvailable ? "Move to Cart" : "Sold Out"}
                  </button>

                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ padding: "10px 14px" }}
                    onClick={() => setQuickViewProduct({ ...item, _id: prodId })}
                    title="Quick View"
                  >
                    <FiEye />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Wishlist;