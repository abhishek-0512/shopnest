import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import { orderService } from "../utils/api";
import { promoCoupons } from "../data/sampleProducts";
import {
  FiShield,
  FiTag,
  FiLock,
} from "react-icons/fi";

import { toast } from "react-toastify";
import "../styles/checkout.css";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart?.cartItems) || [];

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("demo_online"); // demo_online | razorpay | cod

  // Address Form State
  const [address, setAddress] = useState({
    fullName: user?.name || "Aarav Sharma",
    phone: "9876543210",
    street: "Flat 402, Signature Towers, Cyber City",
    city: "Gurugram",
    state: "Haryana",
    postalCode: "122002",
    country: "India",
  });

  // Promo coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    try {
      const storedCoupon = localStorage.getItem("shopnest_applied_coupon");
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch {}
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * (item.qty || 1),
    0
  );

  // Discount
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

  const isFreeShipping = subtotal > 999 || appliedCoupon?.freeShipping;
  const shippingCharge = isFreeShipping || cartItems.length === 0 ? 0 : 99;
  const gst = Math.round((subtotal - discountAmount) * 0.18);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCharge);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    const found = promoCoupons.find((c) => c.code === code);
    if (!found) {
      toast.error(`Invalid coupon code: "${code}"`);
      return;
    }
    setAppliedCoupon(found);
    setCouponCode(found.code);
    toast.success(`🎉 Coupon "${found.code}" applied successfully!`);
  };

  const validateAddress = () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      toast.error("Please fill in all required shipping address fields");
      return false;
    }
    if (address.phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (address.postalCode.length < 6) {
      toast.error("Please enter a valid 6-digit postal pincode");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateAddress()) return;
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          imageUrl: item.imageUrl,
          price: item.price,
          qty: item.qty || 1,
        })),
        shippingAddress: address,
        totalAmount: grandTotal,
        paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
        razorpay_payment_id:
          paymentMethod === "demo_online"
            ? "pay_demo_" + Math.random().toString(36).substring(7)
            : undefined,
      };

      const result = await orderService.create(orderPayload);

      if (result.success) {
        dispatch(clearCart());
        localStorage.removeItem("shopnest_applied_coupon");
        toast.success("🎉 Order Placed Successfully!");
        navigate("/ordersuccess", {
          state: { order: result.order },
        });
      } else {
        throw new Error(result.message || "Failed to create order");
      }
    } catch (err) {
      console.error("Checkout order error:", err);
      toast.error(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page text-center" style={{ padding: "80px 20px" }}>
        <h2>No Items to Checkout</h2>
        <p style={{ margin: "14px 0 24px" }}>
          Please add products to your cart before proceeding to checkout.
        </p>
        <Link to="/shop" className="btn-primary">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="cart-header-title">
        <h1>
          Secure <span className="gradient-text">Checkout</span>
        </h1>
        <p>Complete your shipping information and choose your preferred payment option.</p>
      </div>

      <div className="checkout-grid-layout">
        {/* LEFT COLUMN: ADDRESS & PAYMENT */}
        <div className="checkout-main-col">
          {/* STEP 1: SHIPPING ADDRESS */}
          <div className="checkout-section-card glass-panel">
            <div className="section-card-title">
              <span className="step-badge">1</span>
              <h3>Delivery & Shipping Address</h3>
            </div>

            <div className="address-form-grid">
              <div className="form-group full-width">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  className="input-field"
                  placeholder="e.g. Aarav Sharma"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number (for delivery SMS) *</label>
                <input
                  type="tel"
                  name="phone"
                  className="input-field"
                  placeholder="10-digit mobile number"
                  value={address.phone}
                  onChange={handleAddressChange}
                  maxLength="10"
                  required
                />
              </div>

              <div className="form-group">
                <label>Postal Pincode *</label>
                <input
                  type="text"
                  name="postalCode"
                  className="input-field"
                  placeholder="e.g. 110001"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                  maxLength="6"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Street Address, Apartment & Landmark *</label>
                <input
                  type="text"
                  name="street"
                  className="input-field"
                  placeholder="Flat / House no, Building name, Street"
                  value={address.street}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>City / Town *</label>
                <input
                  type="text"
                  name="city"
                  className="input-field"
                  placeholder="e.g. Gurugram"
                  value={address.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  className="input-field"
                  placeholder="e.g. Haryana"
                  value={address.state}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* STEP 2: PAYMENT METHOD */}
          <div className="checkout-section-card glass-panel">
            <div className="section-card-title">
              <span className="step-badge">2</span>
              <h3>Select Payment Method</h3>
            </div>

            <div className="payment-options-list">
              {/* DEMO ONE-CLICK INSTANT */}
              <label
                className={`payment-option-label ${
                  paymentMethod === "demo_online" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="demo_online"
                  checked={paymentMethod === "demo_online"}
                  onChange={() => setPaymentMethod("demo_online")}
                />
                <div className="payment-option-info">
                  <div className="payment-option-head">
                    <strong>⚡ Instant 1-Click Payment (Demo Mode)</strong>
                    <span className="badge badge-emerald">Recommended</span>
                  </div>
                  <p>
                    Fast & verified simulation with mock UPI / Card authorization
                    for seamless instant checkout.
                  </p>
                </div>
              </label>

              {/* RAZORPAY */}
              <label
                className={`payment-option-label ${
                  paymentMethod === "razorpay" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                />
                <div className="payment-option-info">
                  <div className="payment-option-head">
                    <strong>Razorpay Secure Gateway</strong>
                    <span className="badge badge-primary">UPI / Cards / NetBanking</span>
                  </div>
                  <p>
                    Pay securely using Google Pay, PhonePe, Credit/Debit cards,
                    or Net Banking.
                  </p>
                </div>
              </label>

              {/* CASH ON DELIVERY */}
              <label
                className={`payment-option-label ${
                  paymentMethod === "cod" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div className="payment-option-info">
                  <div className="payment-option-head">
                    <strong>Cash on Delivery (COD)</strong>
                  </div>
                  <p>Pay cash or UPI at your doorstep upon receiving your package.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="checkout-summary-col">
          <div className="checkout-summary-card glass-panel">
            <h3>Order Review</h3>

            {/* ITEMS LIST */}
            <div className="checkout-items-mini-list">
              {cartItems.map((item) => (
                <div key={item.productId} className="checkout-mini-item">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="mini-item-img"
                  />
                  <div className="mini-item-details">
                    <h5>{item.name}</h5>
                    <span>
                      Qty: {item.qty} × ₹{Number(item.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="mini-item-total">
                    ₹{(Number(item.price) * item.qty).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* COUPON */}
            <div className="coupon-box" style={{ marginTop: "10px" }}>
              <div className="coupon-input-group">
                <input
                  type="text"
                  placeholder="Coupon code..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleApplyCoupon()}
                >
                  Apply
                </button>
              </div>

              <div className="promo-chips-list">
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

            {/* SUMMARY BREAKDOWN */}
            <div className="summary-breakdown" style={{ marginTop: "14px" }}>
              <div className="summary-line">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-line text-emerald">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Shipping</span>
                <span>
                  {shippingCharge === 0 ? (
                    <strong className="text-emerald">FREE</strong>
                  ) : (
                    `₹${shippingCharge}`
                  )}
                </span>
              </div>

              <div className="summary-line">
                <span>GST (18% inclusive)</span>
                <span>₹{gst.toLocaleString("en-IN")}</span>
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
              className="btn-primary checkout-place-btn"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              <FiLock /> {loading ? "Processing Order..." : `Pay ₹${grandTotal.toLocaleString("en-IN")}`}
            </button>

            <p className="checkout-terms-note">
              By clicking "Pay", you agree to ShopNest's Terms of Service and Return Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;