import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";
import "../styles/cart.css";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getImageSrc = (imageUrl) => {
  if (!imageUrl) return "/placeholder.png";
  return imageUrl.startsWith("http") ? imageUrl : `${BACKEND_URL}${imageUrl}`;
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      <h2>Shopping Cart ({totalItems} Items)</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>

          <p>Add some amazing products to get started.</p>

          <Link to="/shop" className="btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.productId}>
                <img
                  src={getImageSrc(item.imageUrl)}
                  alt={item.name}
                  className="cart-item-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png";
                  }}
                />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>

                  <p>
                    Price :
                    <strong>
                      {" "}
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </strong>
                  </p>

                  <p>
                    Subtotal :
                    <strong>
                      {" "}
                      ₹
                      {(item.price * item.qty).toLocaleString("en-IN")}
                    </strong>
                  </p>

                  <div className="qty-controls">
                    <button
                      onClick={() =>
                        dispatch(decreaseQty(item.productId))
                      }
                      disabled={item.qty === 1}
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQty(item.productId))
                      }
                      disabled={item.qty >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() =>
                      dispatch(removeFromCart(item.productId))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <hr />

            <p>
              Items
              <span>{totalItems}</span>
            </p>

            <p>
              Subtotal
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </p>

            <p>
              Shipping
              <span>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </span>
            </p>

            <hr />

            <h2>
              Total
              <span>₹{total.toLocaleString("en-IN")}</span>
            </h2>

            <button
              className="btn btn-checkout"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;