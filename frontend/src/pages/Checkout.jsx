import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import "../styles/cart.css";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const deliveryCharge = subtotal > 999 ? 0 : 99;

  const gst = Math.round(subtotal * 0.18);

  const grandTotal = subtotal + deliveryCharge + gst;

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    try {
      if (!user) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (cartItems.length === 0) {
        alert("Your cart is empty");
        return;
      }

      if (
        !address.fullName ||
        !address.phone ||
        !address.street ||
        !address.city ||
        !address.state ||
        !address.postalCode
      ) {
        alert("Please fill complete shipping address.");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded.");
        return;
      }

      setLoading(true);

      const orderResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            amount: grandTotal,
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        alert(orderData.message || "Unable to create order");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: orderData.amount,

        currency: orderData.currency,

        order_id: orderData.id,

        name: "ShopNest",

        description: "ShopNest Order Payment",

        prefill: {
          name: address.fullName,
          email: user.email,
          contact: address.phone,
        },

        notes: {
          address: `${address.street}, ${address.city}`,
        },

        theme: {
          color: "#f97316",
        },

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${import.meta.env.VITE_API_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              alert("Payment verification failed");
              setLoading(false);
              return;
            }

            const saveOrder = await fetch(
              `${import.meta.env.VITE_API_URL}/api/orders`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                  items: cartItems,

                  shippingAddress: address,

                  totalAmount: grandTotal,

                  paymentStatus: "Paid",

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }),
              }
            );

            const result = await saveOrder.json();

            if (!saveOrder.ok) {
              alert(result.message || "Order saving failed");
              setLoading(false);
              return;
            }

            dispatch(clearCart());

            alert("Order Placed Successfully 🎉");

            navigate("/ordersuccess");
          } catch (err) {
            console.log(err);
            alert("Something went wrong while saving the order.");
          }

          setLoading(false);
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (err) {
      console.log(err);
      alert("Payment Failed");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };
    return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="cart-layout">

        {/* LEFT SIDE */}

        <div className="checkout-content">
          <form className="shipping-form" onSubmit={handleSubmit}>
            <h3>Shipping Address</h3>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={address.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              value={address.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Pincode"
              value={address.postalCode}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleChange}
              required
            />
          </form>
        </div>

        {/* RIGHT SIDE */}

        <div className="cart-summary">

          <h3>Order Summary</h3>

          {cartItems.map((item) => {

            const imageSrc = item.imageUrl?.startsWith("http")
              ? item.imageUrl
              : `${import.meta.env.VITE_API_URL}${item.imageUrl}`;

            return (
              <div
                key={item.productId}
                className="cart-item"
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                }}
              >
                <img
                  src={imageSrc}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>

                  <p>
                    Qty : <strong>{item.qty}</strong>
                  </p>

                  <p>
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>

                  <p
                    style={{
                      color: "#f97316",
                      fontWeight: "600",
                    }}
                  >
                    ₹
                    {Number(item.price * item.qty).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            );
          })}

          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <span>Subtotal</span>

            <span>
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span>Delivery</span>

            <span>
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge}`}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span>GST (18%)</span>

            <span>
              ₹{gst.toLocaleString("en-IN")}
            </span>
          </div>

          <hr />

          <h2
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              color: "#f97316",
            }}
          >
            <span>Total</span>

            <span>
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </h2>

          <button
            type="button"
            className="btn btn-checkout"
            disabled={loading}
            onClick={handlePayment}
          >
            {loading
              ? "Processing Payment..."
              : `Pay ₹${grandTotal.toLocaleString("en-IN")}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;