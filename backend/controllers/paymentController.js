const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();


// ===============================
// RAZORPAY INSTANCE
// ===============================

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID?.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET?.trim(),
});


// ===============================
// CREATE ORDER
// ===============================

const createOrder = async (req, res) => {
  try {

    const { amount } = req.body;


    if (!amount) {
      return res.status(400).json({
        success:false,
        message:"Amount is required",
      });
    }


    const options = {

      // INR -> PAISA
      amount: Math.round(Number(amount) * 100),

      currency:"INR",

      receipt:
        "shopnest_" +
        crypto.randomBytes(10).toString("hex"),

    };


    const order =
      await razorpay.orders.create(options);



    console.log(
      "RAZORPAY ORDER CREATED:",
      order.id
    );


    return res.status(200).json({

      success:true,

      id:order.id,

      amount:order.amount,

      currency:order.currency,

    });


  } catch(error){

    console.log(
      "CREATE ORDER ERROR:",
      error
    );


    return res.status(500).json({

      success:false,

      message:"Unable to create Razorpay order",

      error:error.message,

    });

  }
};



// ===============================
// VERIFY PAYMENT
// ===============================


const verifyPayment = async(req,res)=>{

  try{


    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature

    } = req.body;



    console.log(
      "========== PAYMENT VERIFY =========="
    );


    console.log(
      "ORDER ID:",
      razorpay_order_id
    );


    console.log(
      "PAYMENT ID:",
      razorpay_payment_id
    );


    console.log(
      "RECEIVED SIGNATURE:",
      razorpay_signature
    );


    console.log(
      "SECRET AVAILABLE:",
      !!process.env.RAZORPAY_KEY_SECRET
    );



    if(
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ){

      return res.status(400).json({

        success:false,

        message:"Missing payment details"

      });

    }



    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;



    const expectedSignature =
      crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET.trim()
      )
      .update(body)
      .digest("hex");



    console.log(
      "GENERATED SIGNATURE:",
      expectedSignature
    );


    console.log(
      "===================================="
    );



    if(
      expectedSignature === razorpay_signature
    ){

      return res.status(200).json({

        success:true,

        message:
        "Payment verified successfully",

        paymentId:
        razorpay_payment_id

      });

    }



    return res.status(400).json({

      success:false,

      message:
      "Invalid payment signature"

    });



  }
  catch(error){


    console.log(
      "VERIFY PAYMENT ERROR:",
      error
    );


    return res.status(500).json({

      success:false,

      message:
      "Payment verification failed",

      error:error.message

    });


  }

};




module.exports = {

  createOrder,

  verifyPayment,

};