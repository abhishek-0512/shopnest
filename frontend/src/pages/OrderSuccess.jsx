import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/ordersuccess.css";


const OrderSuccess = () => {


  return (

    <div className="success-container">


      <div className="success-card">


        <div className="success-icon">

          <FaCheckCircle />

        </div>





        <h1>
          Payment Successful 🎉
        </h1>





        <p>

          Thank you for shopping with

          {" "}

          <strong>
            ShopNest
          </strong>

          .

          <br />

          Your payment has been received successfully.

          <br />

          Your order is now being processed.

        </p>






        <div className="success-buttons">


          <Link
            to="/myorders"
            className="success-btn primary-success"
          >

            View My Orders

          </Link>





          <Link
            to="/shop"
            className="success-btn secondary-success"
          >

            Continue Shopping

          </Link>



        </div>



      </div>


    </div>

  );

};


export default OrderSuccess;