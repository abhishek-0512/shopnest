import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

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

        // Debug: Check what the backend is sending
        console.log("Products API Response:", data);

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
      <section className="hero-banner">
        <h1>Welcome to ShopNest</h1>
        <p>Discover premium fashion and everyday essentials.</p>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>

        {loading ? (
          <h3>Loading products...</h3>
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
              <p>No products available.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;