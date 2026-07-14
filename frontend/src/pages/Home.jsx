import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiArrowRight,
  FiStar,
  FiTruck,
  FiShield,
  FiAward,
  FiSmartphone,
  FiWatch,
} from "react-icons/fi";

import ProductCard from "../components/ProductCard";
import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">

      {/* ================= HERO ================= */}

      <section className="hero-section">

        {/* LEFT */}

        <div className="hero-left">

          <span className="hero-tag">
            <FiStar />
            Trusted by Thousands
          </span>

          <h1>
            Shop Smarter,
            <br />
            <span>Live Better.</span>
          </h1>

          <p>
            Discover premium electronics, fashion,
            accessories and everyday essentials with
            secure payments, lightning-fast delivery,
            and unbeatable prices.
          </p>

          <div className="hero-buttons">

            <Link
              to="/shop"
              className="primary-btn"
            >
              <FiShoppingBag />
              Shop Now
            </Link>

            <Link
              to="/shop"
              className="secondary-btn"
            >
              Explore
              <FiArrowRight />
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <h2>500+</h2>
              <span>Products</span>
            </div>

            <div>
              <h2>5K+</h2>
              <span>Happy Customers</span>
            </div>

            <div>
              <h2>4.9★</h2>
              <span>Ratings</span>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="hero-circle"></div>

          <div className="glass-card card1">

            <div className="glass-icon">
              <FiSmartphone />
            </div>

            <h3>Electronics</h3>

            <p>
              Latest Gadgets
            </p>

          </div>

          <div className="glass-card card2">

            <div className="glass-icon">
              👟
            </div>

            <h3>Fashion</h3>

            <p>
              Trending Styles
            </p>

          </div>

          <div className="glass-card card3">

            <div className="glass-icon">
              <FiWatch />
            </div>

            <h3>Accessories</h3>

            <p>
              Premium Collection
            </p>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
            <section className="features">

        <div className="feature-card">
          <FiTruck />

          <h3>Fast Delivery</h3>

          <p>
            Get your favorite products delivered quickly and safely across
            India.
          </p>
        </div>

        <div className="feature-card">
          <FiAward />

          <h3>Premium Quality</h3>

          <p>
            Every product is carefully selected from trusted brands for the
            best shopping experience.
          </p>
        </div>

        <div className="feature-card">
          <FiShield />

          <h3>Secure Payments</h3>

          <p>
            Shop confidently with encrypted payments and trusted checkout
            gateways.
          </p>
        </div>

      </section>

      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="featured-products">

        <div className="section-heading">

          <div>

            <span className="section-tag">
              Featured Collection
            </span>

            <h2>
              Discover Our Best Sellers
            </h2>

          </div>

          <Link
            to="/shop"
            className="view-all-btn"
          >
            View All
            <FiArrowRight />
          </Link>

        </div>

        {loading ? (

          <div className="loading-state">

            <h3>Loading Products...</h3>

            <p>
              Please wait while we fetch our latest collection.
            </p>

          </div>

        ) : (

          <div className="product-grid">

            {products.length > 0 ? (

              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))

            ) : (

              <div className="loading-state">

                <h3>No Products Found</h3>

                <p>
                  New products will be available soon.
                </p>

              </div>

            )}

          </div>

        )}

      </section>

    </div>
  );
};

export default Home;