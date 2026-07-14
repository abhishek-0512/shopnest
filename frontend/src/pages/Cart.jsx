import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";

import "../styles/cart.css";


const BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";


const getImageSrc = (imageUrl) => {

  if (!imageUrl)
    return "/placeholder.png";


  return imageUrl.startsWith("http")
    ? imageUrl
    : `${BACKEND_URL}${imageUrl}`;

};



const Cart = () => {


  const dispatch = useDispatch();

  const navigate = useNavigate();



  const cartItems = useSelector(
    (state)=>state.cart.cartItems
  );



  const totalItems = cartItems.reduce(
    (sum,item)=>sum + item.qty,
    0
  );



  const subtotal = cartItems.reduce(
    (sum,item)=>
      sum + Number(item.price) * item.qty,
    0
  );



  const shipping =
    subtotal > 1000 ? 0 : 99;



  const total =
    subtotal + shipping;




  return (

    <div className="cart-container">


      <h2 className="cart-title">

        Shopping Cart

        <span>
          {totalItems}
          {" "}
          {totalItems === 1 ? "Item" : "Items"}
        </span>

      </h2>



      {
        cartItems.length === 0 ? (

          <div className="empty-cart">

            <h3>
              Your cart is empty
            </h3>

            <p>
              Looks like you haven't added anything yet.
            </p>


            <Link
              to="/shop"
              className="continue-shopping"
            >
              Continue Shopping
            </Link>


          </div>


        ) : (


          <div className="cart-layout">


            {/* PRODUCTS */}

            <div className="cart-items">


              {
                cartItems.map((item)=>(


                  <div
                    className="cart-item"
                    key={item.productId}
                  >


                    <div className="cart-image-box">


                      <img

                        src={
                          getImageSrc(
                            item.imageUrl
                          )
                        }

                        alt={item.name}

                        className="cart-item-image"

                        loading="lazy"


                        onError={(e)=>{

                          e.target.onerror=null;

                          e.target.src="/placeholder.png";

                        }}

                      />


                    </div>





                    <div className="cart-item-details">


                      <h3>
                        {item.name}
                      </h3>



                      <p className="cart-brand">

                        {item.brand || "Premium Product"}

                      </p>




                      <h2 className="cart-price">

                        ₹
                        {
                          Number(item.price)
                          .toLocaleString("en-IN")
                        }

                      </h2>




                      <p className="cart-subtotal">

                        Subtotal:

                        <strong>

                          ₹
                          {
                            (
                              item.price *
                              item.qty
                            )
                            .toLocaleString("en-IN")
                          }

                        </strong>


                      </p>






                      <div className="cart-actions">


                        <div className="qty-controls">


                          <button

                            disabled={
                              item.qty === 1
                            }

                            onClick={()=>{

                              dispatch(
                                decreaseQty(
                                  item.productId
                                )
                              )

                            }}

                          >
                            −
                          </button>



                          <span>
                            {item.qty}
                          </span>




                          <button

                            disabled={
                              item.qty >= item.stock
                            }

                            onClick={()=>{

                              dispatch(
                                increaseQty(
                                  item.productId
                                )
                              )

                            }}

                          >

                            +

                          </button>


                        </div>





                        <button

                          className="btn-remove"

                          onClick={()=>{

                            dispatch(
                              removeFromCart(
                                item.productId
                              )
                            )

                          }}

                        >

                          Remove

                        </button>



                      </div>



                    </div>



                  </div>


                ))
              }


            </div>







            {/* SUMMARY */}


            <div className="cart-summary">


              <h3>
                Order Summary
              </h3>



              <div className="summary-row">

                <span>
                  Items
                </span>

                <span>
                  {totalItems}
                </span>

              </div>





              <div className="summary-row">

                <span>
                  Subtotal
                </span>


                <span>

                  ₹
                  {
                    subtotal
                    .toLocaleString("en-IN")
                  }

                </span>


              </div>





              <div className="summary-row">

                <span>
                  Shipping
                </span>


                <span>

                  {
                    shipping===0
                    ? "FREE"
                    : `₹${shipping}`
                  }

                </span>


              </div>






              <hr/>




              <div className="summary-total">

                <span>
                  Total
                </span>


                <span>

                  ₹
                  {
                    total
                    .toLocaleString("en-IN")
                  }

                </span>


              </div>





              <button

                className="btn-checkout"

                onClick={()=>navigate("/checkout")}

              >

                Proceed To Checkout

              </button>




              <Link

                to="/shop"

                className="continue-shopping"

              >

                ← Continue Shopping

              </Link>



            </div>




          </div>


        )

      }


    </div>

  );

};



export default Cart;