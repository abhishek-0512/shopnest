import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/cart.css";

const getImageSrc = (imageUrl) => {
  if (!imageUrl) return "/placeholder.png";
  return imageUrl.startsWith("http")
    ? imageUrl
    : `${import.meta.env.VITE_API_URL}${imageUrl}`;
};

const getExpectedDelivery = (createdAt) => {
  const orderDate = new Date(createdAt);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 5); // 5 days from order date

  return deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/myorders`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="cart-container">
        <h2>Please login to view your orders.</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-container">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="cart-summary"
            style={{
              marginBottom: "30px",
            }}
          >
            <h3>Order ID</h3>

            <p
              style={{
                wordBreak: "break-word",
              }}
            >
              {order._id}
            </p>

            <hr />

            <p>
              <strong>Status :</strong>{" "}
              <span
                style={{
                  color:
                    order.orderStatus === "Delivered"
                      ? "#22c55e"
                      : "#f59e0b",
                }}
              >
                {order.orderStatus}
              </span>
            </p>

            <p>
              <strong>Payment :</strong>{" "}
              <span
                style={{
                  color:
                    order.paymentStatus === "Paid"
                      ? "#22c55e"
                      : "#ef4444",
                }}
              >
                {order.paymentStatus}
              </span>
            </p>

            <p>
              <strong>Total :</strong> ₹
              {Number(order.totalPrice).toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Ordered On :</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {order.orderStatus !== "Delivered" && (
              <p>
                <strong>Expected Delivery :</strong>{" "}
                <span style={{ color: "#f97316" }}>
                  {getExpectedDelivery(order.createdAt)}
                </span>
              </p>
            )}

            <hr />

            {order.orderItems.map((item) => (
              <div
                key={item.product}
                className="cart-item"
                style={{
                  marginTop: "20px",
                }}
              >
                <img
                  src={getImageSrc(item.image)}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>

                  <p>₹{item.price}</p>

                  <p>Quantity : {item.qty}</p>
                </div>
              </div>
            ))}

            <hr />

            <h4>Shipping Address</h4>

            <p>{order.shippingAddress.fullName}</p>

            <p>{order.shippingAddress.phone}</p>

            <p>{order.shippingAddress.street}</p>

            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </p>

            <p>
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;