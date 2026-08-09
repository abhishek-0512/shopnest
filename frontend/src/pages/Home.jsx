import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiArrowRight,
  FiStar,
  FiTruck,
  FiShield,
  FiAward,
  FiClock,
  FiZap,
  FiCheckCircle,
  FiSend,
  FiTag,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { sampleCategories, promoCoupons } from "../data/sampleProducts";
import { productService } from "../utils/api";
import { toast } from "react-toastify";
import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [unlockedCoupon, setUnlockedCoupon] = useState(null);

  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(data);
      } catch (err) {
        console.error("Home product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setUnlockedCoupon("WELCOME50");
    toast.success("🎉 Welcome to ShopNest Club! Coupon unlocked: WELCOME50");
    setNewsletterEmail("");
  };

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div className="home-container">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-grid">
          {/* LEFT CONTENT */}
          <div className="hero-content">
            <div className="hero-badge-pill">
              <span className="sparkle-icon">✦</span>
              <span>Next-Gen E-Commerce Experience</span>
            </div>

            <h1 className="hero-headline">
              Redefining <span className="gradient-text">Luxury & Quality</span> Shopping.
            </h1>

            <p className="hero-subtitle">
              Discover curated flagships in electronics, bespoke fashion,
              certified medical essentials, and performance sports gear — with
              ultra-fast delivery and verified buyer assurance.
            </p>

            <div className="hero-cta-group">
              <Link to="/shop" className="btn-primary hero-main-btn">
                <FiShoppingBag /> Explore Catalog <FiArrowRight />
              </Link>
              <a href="#flash-deals" className="btn-secondary">
                <FiZap /> Flash Deals
              </a>
            </div>

            {/* STATS TICKER */}
            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <h3>500+</h3>
                <p>Curated Products</p>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <h3>4.9★</h3>
                <p>Verified Rating</p>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <h3>99.8%</h3>
                <p>On-Time Delivery</p>
              </div>
            </div>
          </div>

          {/* RIGHT FLOATING CARDS */}
          <div className="hero-visual">
            <div className="hero-orb-glow orb-1" />
            <div className="hero-orb-glow orb-2" />

            <div className="hero-feature-card hero-card-main glass-panel">
              <div className="hero-card-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                  alt="Sony Headphones"
                />
                <span className="badge badge-emerald">Bestseller</span>
              </div>
              <div className="hero-card-details">
                <span className="brand-tag">Sony Audio</span>
                <h4>WH-1000XM5 ANC Headset</h4>
                <div className="hero-card-bottom">
                  <span className="hero-card-price">₹26,990</span>
                  <Link to="/shop?category=electronics" className="btn-outline">
                    View
                  </Link>
                </div>
              </div>
            </div>

            {/* FLOATING MINI PILLS */}
            <div className="floating-pill pill-top glass-panel">
              <FiCheckCircle className="pill-icon-emerald" />
              <div>
                <strong>100% Authentic</strong>
                <span>Direct Brand Guarantee</span>
              </div>
            </div>

            <div className="floating-pill pill-bottom glass-panel">
              <FiZap className="pill-icon-amber" />
              <div>
                <strong>Express 2-Day</strong>
                <span>Pan-India Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SHOWCASE ================= */}
      <section className="categories-section">
        <div className="section-header-centered">
          <span className="section-kicker">Explore by Department</span>
          <h2>Curated Categories</h2>
          <p>Hand-picked premium selections across our 4 core departments</p>
        </div>

        <div className="categories-grid">
          {sampleCategories
            .filter((c) => c.id !== "all")
            .map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="category-card glass-panel glass-panel-hover"
              >
                <div className="category-image-wrap">
                  <img src={cat.image} alt={cat.name} />
                  <div className="category-overlay-gradient" />
                </div>
                <div className="category-content">
                  <span className="category-count-badge">
                    {cat.count} Premium Items
                  </span>
                  <h3>{cat.name}</h3>
                  <p>{cat.tagline}</p>
                  <span className="category-arrow-link">
                    Explore Department <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* ================= FLASH SALE COUNTDOWN BANNER ================= */}
      <section id="flash-deals" className="flash-sale-section">
        <div className="flash-sale-banner glass-panel">
          <div className="flash-sale-content">
            <div className="flash-sale-tag">
              <FiZap /> Limited Time Lightning Deals
            </div>
            <h2>
              Save Up to <span className="gradient-text-amber">40% OFF</span> on Flagships
            </h2>
            <p>
              Use coupon code <strong>SHOPNEST20</strong> at checkout for an extra 20% instant discount.
            </p>

            <div className="countdown-timer-group">
              <div className="timer-box">
                <span className="timer-number">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="timer-label">Hours</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-box">
                <span className="timer-number">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="timer-label">Mins</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-box">
                <span className="timer-number">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="timer-label">Secs</span>
              </div>
            </div>

            <Link to="/shop" className="btn-primary flash-btn">
              Claim Flash Deals <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS TABS ================= */}
      <section className="featured-section">
        <div className="featured-header-row">
          <div>
            <span className="section-kicker">Trending Now</span>
            <h2>Top Rated Selections</h2>
          </div>

          {/* CATEGORY FILTER TABS */}
          <div className="category-tabs-row">
            {sampleCategories.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab-btn ${
                  activeTab === cat.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="products-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: "380px" }} />
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="featured-bottom-cta">
          <Link to="/shop" className="btn-secondary">
            View All {products.length} Products <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* ================= TRUST & VALUE PROPOSITIONS ================= */}
      <section className="trust-features-section">
        <div className="trust-grid">
          <div className="trust-card glass-panel">
            <div className="trust-icon-box">
              <FiTruck />
            </div>
            <h4>Free & Insured Shipping</h4>
            <p>Complimentary express shipping across India on orders above ₹999.</p>
          </div>

          <div className="trust-card glass-panel">
            <div className="trust-icon-box">
              <FiShield />
            </div>
            <h4>256-Bit Secure Checkout</h4>
            <p>End-to-end encrypted transactions via Razorpay, UPI, & Net Banking.</p>
          </div>

          <div className="trust-card glass-panel">
            <div className="trust-icon-box">
              <FiAward />
            </div>
            <h4>100% Certified Authentic</h4>
            <p>Every product is sourced directly with original manufacturer warranty.</p>
          </div>

          <div className="trust-card glass-panel">
            <div className="trust-icon-box">
              <FiClock />
            </div>
            <h4>7-Day Easy Returns</h4>
            <p>Hassle-free doorstep pickup and instant refund turnaround.</p>
          </div>
        </div>
      </section>

      {/* ================= CUSTOMER TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <div className="section-header-centered">
          <span className="section-kicker">Verified Feedback</span>
          <h2>Loved by 5,000+ Customers</h2>
          <p>Real stories from verified ShopNest shoppers</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card glass-panel">
            <div className="stars-row">
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
            </div>
            <p className="testimonial-text">
              "The iPhone 15 Pro Max arrived in pristine condition within 36 hours.
              The packaging was rock solid and the price was the best on the market."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">AS</div>
              <div>
                <strong>Aarav Sharma</strong>
                <span>Verified Buyer • Bengaluru</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="stars-row">
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
            </div>
            <p className="testimonial-text">
              "ShopNest's customer support is world-class. When I needed a size
              exchange on the wool overcoat, they processed it in 24 hours without friction!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">PK</div>
              <div>
                <strong>Pooja Kapoor</strong>
                <span>Verified Buyer • Mumbai</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="stars-row">
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
              <FiStar className="star-icon" />
            </div>
            <p className="testimonial-text">
              "The Omron ECG monitor is genuine and synced instantly with my phone.
              Peace of mind for my parents' health tracking."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">RV</div>
              <div>
                <strong>Rohan Verma</strong>
                <span>Verified Buyer • Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER & COUPON UNLOCK ================= */}
      <section className="newsletter-section">
        <div className="newsletter-card glass-panel">
          <div className="newsletter-content">
            <span className="newsletter-tag">
              <FiTag /> Nest Club Privileges
            </span>
            <h2>Get ₹500 OFF Your Next Order</h2>
            <p>
              Subscribe to get exclusive member drops, weekly flash deals, and an
              instant ₹500 welcome coupon code.
            </p>

            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">
                <FiSend /> Unlock Coupon
              </button>
            </form>

            {unlockedCoupon && (
              <div className="unlocked-coupon-banner">
                <span>Your Welcome Coupon Code:</span>
                <strong className="coupon-code-pill">{unlockedCoupon}</strong>
                <span>(Flat ₹500 OFF on checkout)</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;