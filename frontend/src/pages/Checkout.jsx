import React, {
  useState,
  useContext,
  useEffect,
} from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import { clearCart } from "../redux/cartSlice";

import { toast } from "react-toastify";

import "../styles/checkout.css";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";



const getImageSrc = (imageUrl) => {

  if (!imageUrl)
    return "/placeholder.png";


  return imageUrl.startsWith("http")
    ? imageUrl
    : `${API_URL}${imageUrl}`;

};





const Checkout = () => {


  const { user } = useContext(AuthContext);


  const dispatch = useDispatch();

  const navigate = useNavigate();



  const cartItems = useSelector(
    (state)=>state.cart.cartItems
  );



  const [loading,setLoading] =
    useState(false);



  const [address,setAddress] =
    useState({

      fullName:"",
      phone:"",
      street:"",
      city:"",
      state:"",
      postalCode:"",
      country:"India",

    });



  // ==============================
  // LOAD USER NAME
  // ==============================

  useEffect(()=>{


    if(user){

      console.log(
        "CHECKOUT USER:",
        user
      );


      setAddress((prev)=>({

        ...prev,

        fullName:user.name || ""

      }));

    }


  },[user]);




  const subtotal =
    cartItems.reduce(
      (total,item)=>
        total +
        Number(item.price) *
        item.qty,
      0
    );



  const deliveryCharge =
    subtotal > 999 ? 0 : 99;



  const gst =
    Math.round(subtotal * 0.18);



  const grandTotal =
    subtotal +
    deliveryCharge +
    gst;




  const handleChange=(e)=>{

    setAddress({

      ...address,

      [e.target.name]:
      e.target.value

    });

  };





  const validateAddress=()=>{


    if(

      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.postalCode

    ){

      toast.error(
        "Please complete shipping address"
      );

      return false;

    }



    if(address.phone.length !== 10){

      toast.error(
        "Enter valid mobile number"
      );

      return false;

    }



    if(address.postalCode.length !== 6){

      toast.error(
        "Enter valid pincode"
      );

      return false;

    }


    return true;


  };






const handlePayment = async()=>{


try{


if(loading)
return;



if(!user){

toast.warning(
"Please login first"
);

navigate("/login");

return;

}



if(!user.token){

toast.error(
"Authentication token missing. Login again."
);

return;

}



console.log(
"PAYMENT TOKEN:",
user.token
);



if(cartItems.length===0){

toast.warning(
"Your cart is empty"
);

return;

}



if(!validateAddress())
return;



if(!window.Razorpay){

toast.error(
"Payment gateway not loaded"
);

return;

}



setLoading(true);




// ==========================
// CREATE RAZORPAY ORDER
// ==========================


const orderResponse =
await fetch(

`${API_URL}/api/payment/create-order`,

{

method:"POST",

headers:{

"Content-Type":
"application/json",

Authorization:
`Bearer ${user.token}`

},

body:JSON.stringify({

amount:grandTotal

})

}

);



const orderData =
await orderResponse.json();



console.log(
"CREATE ORDER RESPONSE:",
orderData
);



if(!orderResponse.ok){

toast.error(
orderData.message ||
"Order creation failed"
);

setLoading(false);

return;

}




// ==========================
// RAZORPAY OPTIONS
// ==========================


const options={


key:
import.meta.env.VITE_RAZORPAY_KEY,


amount:
orderData.amount,


currency:
orderData.currency,


order_id:
orderData.id,


name:
"ShopNest",


description:
"ShopNest Payment",



prefill:{


name:
address.fullName,


email:
user.email,


contact:
address.phone


},



handler:async(response)=>{


try{


console.log(
"PAYMENT RESPONSE:",
response
);




// VERIFY PAYMENT


const verifyResponse =
await fetch(

`${API_URL}/api/payment/verify`,

{

method:"POST",

headers:{

"Content-Type":
"application/json",

Authorization:
`Bearer ${user.token}`

},


body:JSON.stringify({

razorpay_order_id:
response.razorpay_order_id,


razorpay_payment_id:
response.razorpay_payment_id,


razorpay_signature:
response.razorpay_signature

})

}

);



const verifyData =
await verifyResponse.json();



console.log(
"VERIFY RESPONSE:",
verifyData
);



if(
!verifyResponse.ok ||
!verifyData.success
){

toast.error(
verifyData.message ||
"Payment verification failed"
);

return;

}





// SAVE ORDER


const saveOrder =
await fetch(

`${API_URL}/api/orders`,

{

method:"POST",

headers:{

"Content-Type":
"application/json",

Authorization:
`Bearer ${user.token}`

},


body:JSON.stringify({

items:cartItems,


shippingAddress:address,


totalAmount:grandTotal,


paymentStatus:"Paid",


razorpay_order_id:
response.razorpay_order_id,


razorpay_payment_id:
response.razorpay_payment_id,


razorpay_signature:
response.razorpay_signature

})

}

);



const result =
await saveOrder.json();



console.log(
"SAVE ORDER:",
result
);



if(!saveOrder.ok){

toast.error(
result.message ||
"Order failed"
);

return;

}



dispatch(clearCart());


toast.success(
"Order placed successfully 🎉"
);


navigate("/ordersuccess");



}
catch(error){

console.log(error);

toast.error(
"Payment processing failed"
);

}



finally{

setLoading(false);

}


}



};




const razorpay =
new window.Razorpay(options);



razorpay.on(
"payment.failed",
()=>{

toast.error(
"Payment failed"
);

setLoading(false);

}

);



razorpay.open();



}

catch(error){


console.error(
"PAYMENT ERROR:",
error
);


toast.error(
"Payment failed"
);


setLoading(false);


}



};






return (

<div className="checkout-container">


<h1 className="checkout-title">
Checkout
</h1>



<div className="checkout-layout">


<div className="checkout-card">


<h2>
Shipping Address
</h2>


<div className="input-grid">


{
Object.keys(address)
.map((field)=>(


<input

key={field}

name={field}

value={address[field]}

placeholder={
field
.replace(/([A-Z])/g," $1")
.replace(/^./,
(str)=>str.toUpperCase())
}

onChange={handleChange}

/>


))

}



</div>


</div>





<div className="checkout-summary">


<h2>
Order Summary
</h2>



{
cartItems.map(item=>(


<div
className="checkout-product"
key={item.productId}
>


<img

src={
getImageSrc(item.imageUrl)
}

alt={item.name}

className="checkout-product-image"


onError={(e)=>{

e.target.src="/placeholder.png";

}}

/>



<div>

<h4>
{item.name}
</h4>


<p>
Qty: {item.qty}
</p>



<strong>

₹
{(
item.price *
item.qty
).toLocaleString("en-IN")}

</strong>


</div>


</div>


))

}




<div className="checkout-row">

<span>
Subtotal
</span>


<b>
₹{subtotal.toLocaleString("en-IN")}
</b>


</div>




<div className="checkout-row">

<span>
Delivery
</span>


<b>

{
deliveryCharge===0
?
"FREE"
:
`₹${deliveryCharge}`
}

</b>


</div>




<div className="checkout-row">

<span>
GST (18%)
</span>


<b>
₹{gst.toLocaleString("en-IN")}
</b>


</div>





<div className="checkout-total">


<span>
Total
</span>


<strong>

₹
{grandTotal.toLocaleString("en-IN")}

</strong>


</div>




<button

className="btn-checkout"

disabled={loading}

onClick={handlePayment}

>

{

loading
?
"Processing Payment..."
:
`Pay ₹${grandTotal.toLocaleString("en-IN")}`

}


</button>




</div>


</div>


</div>


);


};



export default Checkout;