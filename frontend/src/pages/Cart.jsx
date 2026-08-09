import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/cartSlice";
import { promoCoupons } from "../data/sampleProducts";
import {
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
  FiTruck,
  FiShield,
  FiTag,
  FiCheck,
  FiArrowLeft,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "../styles/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart?.cartItems) || [];

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.qty || 1),
    0
  );

  const freeShippingThreshold = 1000;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon?.freeShipping;
  const shippingFee = isFreeShipping || cartItems.length === 0 ? 0 : 99;
  const amountNeededForFreeShip = Math.max(0, freeShippingThreshold - subtotal);
  const freeShipPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.min(
        appliedCoupon.maxDiscount || 5000,
        Math.round((subtotal * appliedCoupon.discountPercent) / 100)
      );
    } else if (appliedCoupon.flatDiscount) {
      discountAmount = appliedCoupon.flatDiscount;
    }
  }

  const tax = Math.round((subtotal - discountAmount) * 0.18);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    const found = promoCoupons.find((c) => c.code === code);

    if (!found) {
      toast.error(`Invalid coupon code: "${code}"`);
      return;
    }

    if (found.minCartValue && subtotal < found.minCartValue) {
      toast.warning(`Minimum cart value of ₹${found.minCartValue} required for ${code}`);
      return;
    }

    setAppliedCoupon(found);
    setCouponCode(found.code);
    toast.success(`🎉 Coupon "${found.code}" applied! Discount calculated.`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    // Save coupon in localStorage for checkout
    if (appliedCoupon) {
      localStorage.setItem("shopnest_applied_coupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("shopnest_applied_coupon");
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart-card glass-panel">
          <div className="empty-cart-icon">
            <FiShoppingBag />
          </div>
          <h2>Your Cart is Currently Empty</h2>
          <p>
            Explore our curated collections across Electronics, Fashion, Sports,
            and Wellness to find items you love!
          </p>
          <Link to="/shop" className="btn-primary">
            <FiShoppingBag /> Start Shopping Now <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header-title">
        <h1>
          Shopping <span className="gradient-text">Cart</span>
        </h1>
        <p>
          Review your items ({cartItems.reduce((s, i) => s + (i.qty || 1), 0)}{" "}
          items) and apply member coupons for instant savings.
        </p>
      </div>

      {/* FREE SHIPPING PROGRESS */}
      <div className="free-shipping-progress-card glass-panel">
        <div className="shipping-progress-header">
          <FiTruck className="truck-icon" />
          <span>
            {isFreeShipping ? (
              <strong className="text-emerald">
                🎉 Congratulations! You have unlocked FREE Express Delivery!
              </strong>
            ) : (
              <>
                Add{" "}
                <strong className="text-amber">
                  ₹{amountNeededForFreeShip.toLocaleString("en-IN")}
                </strong>{" "}
                more to unlock FREE Express Shipping!
              </>
            )}
          </span>
        </div>
        <div className="shipping-progress-bar-track">
          <div
            className={`shipping-progress-bar-fill ${
              isFreeShipping ? "complete" : ""
            }`}
            style={{ width: `${freeShipPercent}%` }}
          />
        </div>
      </div>

      {/* CART LAYOUT */}
      <div className="cart-main-layout">
        {/* ITEMS LIST */}
        <div className="cart-items-section">
          <div className="cart-items-list">
            {cartItems.map((item) => {
              const itemTotal = Number(item.price || 0) * (item.qty || 1);
              return (
                <div key={item.productId} className="cart-item-card glass-panel">
                  <Link
                    to={`/product/${item.productId}`}
                    className="cart-item-thumb-link"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-item-thumb"
                    />
                  </Link>

                  <div className="cart-item-content">
                    <div className="cart-item-top">
                      <div>
                        <span className="cart-item-brand">
                          {item.brand || "ShopNest"}
                        </span>
                        <Link
                          to={`/product/${item.productId}`}
                          className="cart-item-title"
                        >
                          <h4>{item.name}</h4>
                        </Link>
                      </div>

                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => {
                          dispatch(removeFromCart(item.productId));
                          toast.info(`Removed "${item.name}" from cart`);
                        }}
                        title="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-item-prices">
                        <span className="cart-unit-price">
                          ₹{Number(item.price || 0).toLocaleString("en-IN")}
                        </span>
                        <span className="cart-item-subtotal">
                          Total: ₹{itemTotal.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* QUANTITY CONTROLS */}
                      <div className="qty-stepper">
                        <button
                          disabled={item.qty <= 1}
                          onClick={() => dispatch(decreaseQty(item.productId))}
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          disabled={item.stock && item.qty >= item.stock}
                          onClick={() => dispatch(increaseQty(item.productId))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-items-footer">
            <Link to="/shop" className="continue-shopping-link">
              <FiArrowLeft /> Continue Shopping
            </Link>
            <button
              type="button"
              className="clear-cart-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your entire cart?")) {
                  dispatch(clearCart());
                  toast.info("Cart cleared");
                }
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="cart-summary-section">
          <div className="summary-card glass-panel">
            <h3>Order Summary</h3>

            {/* COUPON INPUT */}
            <div className="coupon-box">
              <label>Have a Promo Code?</label>
              <div className="coupon-input-group">
                <input
                  type="text"
                  placeholder="e.g. SHOPNEST20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  disabled={!!appliedCoupon}
                />
                {appliedCoupon ? (
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={handleRemoveCoupon}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => handleApplyCoupon()}
                  >
                    Apply
                  </button>
                )}
              </div>

              {/* QUICK PROMO CHIPS */}
              <div className="promo-chips-list">
                <span className="promo-hint">Click to apply:</span>
                {promoCoupons.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    className={`promo-chip-btn ${
                      appliedCoupon?.code === c.code ? "active" : ""
                    }`}
                    onClick={() => handleApplyCoupon(c.code)}
                  >
                    <FiTag /> {c.code}
                  </button>
                ))}
              </div>
            </div>

            {/* BREAKDOWN */}
            <div className="summary-breakdown">
              <div className="summary-line">
                <span>Subtotal ({cartItems.reduce((s, i) => s + (i.qty || 1), 0)} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-line text-emerald">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Estimated Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="summary-line">
                <span>GST Tax (18% inclusive)</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-total-line">
                <span>Total Amount:</span>
                <span className="summary-grand-total">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary checkout-action-btn"
              onClick={handleCheckout}
            >
              Proceed to Secure Checkout <FiArrowRight />
            </button>

            <div className="summary-trust-assurances">
              <span>
                <FiShield /> 256-Bit Encrypted Payment
              </span>
              <span>
                <FiCheck /> Official Brand Warranty
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;