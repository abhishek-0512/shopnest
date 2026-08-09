import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { productService } from "../utils/api";
import { sampleCategories } from "../data/sampleProducts";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiGrid,
  FiList,
  FiSliders,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import "../styles/product.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [maxPrice, setMaxPrice] = useState(250000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("latest");
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  // Sync URL search params
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) setCategory(urlCategory.toLowerCase());

    const urlSearch = searchParams.get("search");
    if (urlSearch) setSearch(urlSearch);
  }, [searchParams]);

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll({
          keyword: search,
          category: category !== "all" ? category : undefined,
        });
        setProducts(data);
      } catch (error) {
        console.error("Shop product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val.trim()) {
      setSearchParams({ search: val, ...(category !== "all" ? { category } : {}) });
    } else {
      if (category !== "all") {
        setSearchParams({ category });
      } else {
        setSearchParams({});
      }
    }
  };

  const handleCategorySelect = (catId) => {
    setCategory(catId);
    if (catId === "all") {
      const next = {};
      if (search) next.search = search;
      setSearchParams(next);
    } else {
      setSearchParams({
        category: catId,
        ...(search ? { search } : {}),
      });
    }
  };

  const clearAllFilters = () => {
    setSearch("");
    setCategory("all");
    setMaxPrice(250000);
    setInStockOnly(false);
    setMinRating(0);
    setSort("latest");
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.brand?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      product.category?.toLowerCase() === category.toLowerCase();

    const matchesPrice = Number(product.price || 0) <= maxPrice;

    const matchesStock = inStockOnly ? product.stock > 0 : true;

    const matchesRating = Number(product.rating || 0) >= minRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesStock &&
      matchesRating
    );
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return Number(a.price) - Number(b.price);
    if (sort === "high") return Number(b.price) - Number(a.price);
    if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    (search ? 1 : 0) +
    (maxPrice < 250000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  return (
    <div className="shop-page">
      {/* SHOP BANNER */}
      <div className="shop-banner glass-panel">
        <div className="shop-banner-text">
          <h1>
            Discover <span className="gradient-text">Premium Catalog</span>
          </h1>
          <p>
            Browse through {products.length} hand-crafted items with verified
            authenticity and warranty.
          </p>
        </div>

        <div className="navbar-search-container" style={{ maxWidth: "380px" }}>
          <div className="navbar-search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Filter by keyword or brand..."
              value={search}
              onChange={handleSearchChange}
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  setSearch("");
                  setSearchParams(category !== "all" ? { category } : {});
                }}
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="shop-layout">
        {/* ================= FILTER SIDEBAR ================= */}
        <aside className="filter-sidebar glass-panel">
          <div className="filter-sidebar-header">
            <h3>
              <FiSliders /> Filters
            </h3>
            {activeFiltersCount > 0 && (
              <button
                className="clear-filters-link"
                onClick={clearAllFilters}
              >
                Reset All ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="filter-group">
            <span className="filter-title">Categories</span>
            <div className="category-radio-list">
              {sampleCategories.map((cat) => {
                const count =
                  cat.id === "all"
                    ? products.length
                    : products.filter(
                        (p) => p.category?.toLowerCase() === cat.id
                      ).length;

                return (
                  <label
                    key={cat.id}
                    className={`category-radio-label ${
                      category === cat.id ? "active" : ""
                    }`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <span>{cat.name}</span>
                    <span className="category-count">{count}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <span className="filter-title">Max Budget</span>
            <div className="price-slider-wrap">
              <input
                type="range"
                min="1000"
                max="250000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-range-values">
                <span>₹1,000</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <span className="filter-title">Customer Rating</span>
            <div className="category-radio-list">
              {[
                { label: "All Ratings", val: 0 },
                { label: "4.5★ & Above", val: 4.5 },
                { label: "4.0★ & Above", val: 4.0 },
                { label: "3.5★ & Above", val: 3.5 },
              ].map((r) => (
                <label
                  key={r.val}
                  className={`category-radio-label ${
                    minRating === r.val ? "active" : ""
                  }`}
                  onClick={() => setMinRating(r.val)}
                >
                  <span>{r.label}</span>
                  {minRating === r.val && <FiCheck />}
                </label>
              ))}
            </div>
          </div>

          {/* In-Stock Toggle */}
          <div className="filter-group">
            <span className="filter-title">Availability</span>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>In-Stock Only</span>
            </label>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="shop-main-content">
          {/* Controls Bar */}
          <div className="shop-controls-bar glass-panel">
            <div className="shop-results-count">
              Showing <strong>{sortedProducts.length}</strong> of{" "}
              {products.length} products
            </div>

            <div className="shop-sort-controls">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="sort-select"
              >
                <option value="latest">Sort by: Featured / Newest</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>

              <div className="view-toggle-btns">
                <button
                  type="button"
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                >
                  <FiGrid />
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List View"
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="active-filters-chips">
              {category !== "all" && (
                <span className="filter-chip">
                  Category: {category}
                  <button onClick={() => handleCategorySelect("all")}>
                    <FiX />
                  </button>
                </span>
              )}
              {search && (
                <span className="filter-chip">
                  Keyword: "{search}"
                  <button
                    onClick={() => {
                      setSearch("");
                      setSearchParams(category !== "all" ? { category } : {});
                    }}
                  >
                    <FiX />
                  </button>
                </span>
              )}
              {maxPrice < 250000 && (
                <span className="filter-chip">
                  Max: ₹{maxPrice.toLocaleString("en-IN")}
                  <button onClick={() => setMaxPrice(250000)}>
                    <FiX />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="filter-chip">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)}>
                    <FiX />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="filter-chip">
                  Rating: {minRating}★+
                  <button onClick={() => setMinRating(0)}>
                    <FiX />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="products-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton" style={{ height: "380px" }} />
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className={`products-grid ${viewMode === "list" ? "list-view" : ""}`}>
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-shop-state glass-panel">
              <h3>No matching products found 🔍</h3>
              <p>Try adjusting your search criteria or price filters.</p>
              <button className="btn-primary" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;