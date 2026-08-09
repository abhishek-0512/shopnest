import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { AuthContext } from "../context/AuthContext";
import { productService } from "../utils/api";
import ProductCard from "../components/ProductCard";
import {
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiCheck,
  FiArrowRight,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "../styles/product.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  // Review Form States
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist?.items) || [];
  const isWishlisted = wishlistItems.some(
    (item) => item.productId === product?._id
  );

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" });

        const data = await productService.getById(id);
        setProduct(data);
        setSelectedImage(data.imageUrl);

        // Fetch related products
        const all = await productService.getAll();
        const related = all
          .filter(
            (p) =>
              p._id !== id &&
              p.category?.toLowerCase() === data.category?.toLowerCase()
          )
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Product detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="detail-hero-grid">
          <div className="skeleton" style={{ height: "480px" }} />
          <div
            className="skeleton"
            style={{ height: "480px", display: "flex", flexDirection: "column", gap: "20px" }}
          />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page text-center" style={{ padding: "80px 20px" }}>
        <h2>Product Not Found 😕</h2>
        <p style={{ margin: "16px 0 24px" }}>
          The product you are looking for might have been moved or is unavailable.
        </p>
        <Link to="/shop" className="btn-primary">
          Back to Shop Catalog
        </Link>
      </div>
    );
  }

  const isAvailable = product.stock > 0;
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

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
      toast.success("Added to wishlist! ❤️");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error("Please write a short review comment");
      return;
    }

    try {
      setSubmittingReview(true);
      const reviewerName = user?.name || "Verified Customer";
      const newReview = {
        name: reviewerName,
        rating: Number(reviewRating),
        comment: reviewComment.trim(),
        createdAt: new Date().toISOString(),
      };

      const res = await productService.addReview(product._id, newReview);

      // Update local state
      const currentReviews = product.reviews || [];
      const updatedReviews = [newReview, ...currentReviews];
      const newRating = (
        updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
        updatedReviews.length
      ).toFixed(1);

      setProduct({
        ...product,
        reviews: updatedReviews,
        rating: Number(newRating),
        numReviews: updatedReviews.length,
      });

      setReviewComment("");
      toast.success("Thank you! Your verified review has been published ⭐");
    } catch (err) {
      toast.error("Failed to submit review: " + err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="product-detail-page">
      {/* BREADCRUMB */}
      <nav className="detail-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        <Link to={`/shop?category=${product.category?.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        / <span style={{ color: "#fff" }}>{product.name}</span>
      </nav>

      {/* HERO DETAIL GRID */}
      <div className="detail-hero-grid">
        {/* GALLERY */}
        <div className="detail-gallery">
          <div className="detail-main-image-wrap glass-panel">
            <img
              src={selectedImage || product.imageUrl}
              alt={product.name}
              className="detail-main-image"
            />
            {product.badge && (
              <span
                className="badge badge-primary"
                style={{ position: "absolute", top: "18px", left: "18px" }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="detail-thumbnails">
            {[product.imageUrl, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"].map(
              (img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumb-btn ${selectedImage === img ? "active" : ""}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt="thumb" />
                </button>
              )
            )}
          </div>
        </div>

        {/* INFO PANEL */}
        <div className="detail-info-panel">
          <span className="detail-brand-badge">{product.brand}</span>

          <h1 className="detail-title">{product.name}</h1>

          {/* RATING & REVIEWS */}
          <div className="detail-rating-row">
            <div className="rating-badge-large">
              <FiStar style={{ fill: "#f59e0b" }} />
              <span>{product.rating || "4.8"}</span>
            </div>
            <a href="#reviews-section" className="review-count-text">
              ({product.numReviews || (product.reviews?.length ?? 12)} Customer Reviews)
            </a>
            <span
              className={`stock-pill ${
                isAvailable ? "in-stock" : "out-of-stock"
              }`}
            >
              {isAvailable ? `● In Stock (${product.stock})` : "● Out of Stock"}
            </span>
          </div>

          {/* PRICE BOX */}
          <div className="detail-price-box">
            <span className="detail-price-main">
              ₹{Number(product.price || 0).toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="detail-price-old">
                ₹{Number(product.originalPrice).toLocaleString("en-IN")}
              </span>
            )}
            {discount && (
              <span className="detail-savings-badge">Save {discount}%</span>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          {/* ATTRIBUTES / SPECIFICATIONS */}
          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <div className="detail-specs-table">
              {Object.entries(product.attributes).map(([k, v]) => (
                <div key={k} className="spec-row">
                  <span className="spec-key">{k}</span>
                  <span className="spec-value">{String(v)}</span>
                </div>
              ))}
            </div>
          )}

          {/* ACTION BUTTONS */}
          {isAvailable ? (
            <>
              <div className="detail-action-group">
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

                <button className="btn-detail-cart" onClick={handleAddToCart}>
                  <FiShoppingBag /> Add to Shopping Cart
                </button>

                <button
                  className={`btn-detail-wishlist ${
                    isWishlisted ? "active" : ""
                  }`}
                  onClick={handleWishlistToggle}
                  title="Save to Wishlist"
                >
                  <FiHeart />
                </button>
              </div>

              <button className="btn-detail-buy-now" onClick={handleBuyNow}>
                ⚡ Buy Now with 1-Click Checkout
              </button>
            </>
          ) : (
            <button className="btn-secondary" disabled style={{ width: "100%" }}>
              Currently Out of Stock
            </button>
          )}

          {/* TRUST ASSURANCES */}
          <div className="detail-trust-perks">
            <div className="trust-perk-item">
              <FiTruck />
              <span>Express 2-Day Shipping</span>
            </div>
            <div className="trust-perk-item">
              <FiShield />
              <span>1-Year Official Warranty</span>
            </div>
            <div className="trust-perk-item">
              <FiRotateCcw />
              <span>7-Day Return Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= REVIEWS SECTION ================= */}
      <section id="reviews-section" className="reviews-section glass-panel">
        <div className="reviews-header">
          <span className="section-kicker">Ratings & Reviews</span>
          <h2>Customer Experiences</h2>
        </div>

        <div className="reviews-grid-layout">
          {/* SUMMARY SCORE */}
          <div className="reviews-score-summary">
            <div className="overall-score-box">
              <span className="overall-score-number">
                {product.rating || "4.8"}
              </span>
              <div className="stars-row">
                <FiStar style={{ fill: "#f59e0b" }} />
                <FiStar style={{ fill: "#f59e0b" }} />
                <FiStar style={{ fill: "#f59e0b" }} />
                <FiStar style={{ fill: "#f59e0b" }} />
                <FiStar style={{ fill: "#f59e0b" }} />
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Based on {product.numReviews || (product.reviews?.length ?? 12)} ratings
              </p>
            </div>

            {/* DISTRIBUTION BARS */}
            <div className="rating-bars-list">
              {[
                { stars: "5★", pct: "78%" },
                { stars: "4★", pct: "16%" },
                { stars: "3★", pct: "4%" },
                { stars: "2★", pct: "1%" },
                { stars: "1★", pct: "1%" },
              ].map((bar) => (
                <div key={bar.stars} className="rating-bar-row">
                  <span>{bar.stars}</span>
                  <div className="rating-progress-track">
                    <div
                      className="rating-progress-fill"
                      style={{ width: bar.pct }}
                    />
                  </div>
                  <span>{bar.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* REVIEWS LIST & FORM */}
          <div>
            {/* WRITE REVIEW FORM */}
            <div className="write-review-card">
              <h3>Share Your Feedback</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                Reviewed this item? Help fellow shoppers make the best choice.
              </p>

              <form onSubmit={handleReviewSubmit}>
                <div className="star-rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-select-btn ${
                        reviewRating >= star ? "active" : ""
                      }`}
                      onClick={() => setReviewRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  className="textarea-field"
                  rows="3"
                  placeholder="What did you love or think could be improved? (Quality, fit, speed, etc.)"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ marginTop: "12px" }}
                  disabled={submittingReview}
                >
                  <FiSend /> {submittingReview ? "Submitting..." : "Post Review"}
                </button>
              </form>
            </div>

            {/* REVIEWS LIST */}
            <div className="reviews-list">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <div key={idx} className="review-item-card">
                    <div className="review-item-header">
                      <div className="reviewer-profile">
                        <div className="reviewer-avatar">
                          {rev.name ? rev.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <span className="reviewer-name">{rev.name}</span>
                          <div className="stars-row" style={{ fontSize: "0.8rem", margin: "2px 0" }}>
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <FiStar key={i} style={{ fill: "#f59e0b" }} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="review-date">
                        {rev.createdAt
                          ? new Date(rev.createdAt).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Verified Buyer"}
                      </span>
                    </div>
                    <p className="review-comment">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className="review-item-card" style={{ textAlign: "center", padding: "30px" }}>
                  <p style={{ color: "var(--text-muted)" }}>
                    No reviews yet. Be the first to leave a review!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: "70px" }}>
          <div className="section-header-centered" style={{ marginBottom: "30px" }}>
            <span className="section-kicker">Recommended For You</span>
            <h2>You May Also Like</h2>
          </div>

          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;