import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/cartSlice";

import {
  addToWishlist,
  removeFromWishlist
} from "../redux/wishlistSlice";


import {
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeart
} from "react-icons/fa";


import { toast } from "react-toastify";

import "../styles/product.css";



const BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";




const getImageSrc = (imageUrl)=>{

  if(!imageUrl){

    return "/placeholder.png";

  }


  return imageUrl.startsWith("http")

    ? imageUrl

    : `${BACKEND_URL}${imageUrl}`;

};







const ProductDetail = ()=>{


  const {id}=useParams();


  const dispatch=useDispatch();


  const navigate=useNavigate();



  const [product,setProduct]=useState(null);


  const [loading,setLoading]=useState(true);


  const [quantity,setQuantity]=useState(1);





  const wishlistItems = useSelector(

    state=>state.wishlist.items

  );









  const isWishlisted = wishlistItems.some(

    item => item.productId === product?._id

  );









  useEffect(()=>{


    const fetchProduct = async()=>{


      try{


        const res = await fetch(

          `${import.meta.env.VITE_API_URL}/api/products/${id}`

        );



        if(!res.ok){

          throw new Error(
            "Product not found"
          );

        }



        const data = await res.json();


        setProduct(data);



      }

      catch(error){


        console.log(error);


        setProduct(null);


      }

      finally{


        setLoading(false);


      }


    };



    fetchProduct();



  },[id]);









  const increaseQuantity = ()=>{


    if(quantity < product.stock){


      setQuantity(quantity + 1);


    }


  };









  const decreaseQuantity = ()=>{


    if(quantity > 1){


      setQuantity(quantity - 1);


    }


  };









  const addProductToCart = ()=>{


    dispatch(

      addToCart({

        productId:product._id,

        name:product.name,

        price:product.price,

        imageUrl:product.imageUrl,

        brand:product.brand,

        stock:product.stock,

        qty:quantity


      })

    );


  };









  const handleAddToCart = ()=>{


    if(product.stock <= 0){


      toast.error(
        "Product is out of stock"
      );


      return;


    }



    addProductToCart();



    toast.success(

      `${product.name} added to cart 🛒`

    );


  };









  const handleBuyNow = ()=>{


    if(product.stock <= 0){


      toast.error(
        "Product is out of stock"
      );


      return;


    }



    addProductToCart();



    toast.success(
      "Redirecting to checkout 🚀"
    );


    navigate("/checkout");


  };









  const handleWishlist = ()=>{


    if(isWishlisted){



      dispatch(

        removeFromWishlist(
          product._id
        )

      );



      toast.info(
        "Removed from wishlist"
      );


    }


    else{



      dispatch(

        addToWishlist({


          productId:product._id,


          name:product.name,


          price:product.price,


          imageUrl:product.imageUrl,


          brand:product.brand,


          stock:product.stock


        })

      );



      toast.success(
        "Added to wishlist ❤️"
      );


    }


  };









  if(loading){


    return(

      <div className="loading-container">

        Loading Product...

      </div>

    );

  }









  if(!product){


    return(

      <div className="error-container">

        Product Not Found

      </div>

    );

  }









  return(


<div className="product-detail-container">



<div className="breadcrumb">


<Link to="/">
Home
</Link>


{" / "}


<Link to="/shop">
Shop
</Link>


{" / "}


<span>

{product.category}

</span>


</div>









<div className="product-detail">







<div className="detail-image-container">


<div className="category-badge">

{product.category}

</div>





<img

src={getImageSrc(product.imageUrl)}

alt={product.name}

className="detail-image"

loading="lazy"

onError={(e)=>{

e.target.onerror=null;

e.target.src="/placeholder.png";

}}

/>



</div>









<div className="detail-info">






<div className="rating-box">


<FaStar/>


<span>

{product.rating || "4.5"}

</span>


<span>

({product.numReviews || 0} Reviews)

</span>


</div>









<h1 className="product-title">

{product.name}

</h1>









<p className="product-price">

₹
{Number(product.price || 0)
.toLocaleString("en-IN")}

</p>









<p className={

product.stock>0

?

"stock-status in-stock"

:

"stock-status out-of-stock"

}>


{

product.stock>0

?

`Available (${product.stock})`

:

"Out of Stock"

}


</p>









{

product.stock>0 &&


<div className="quantity-box">


<button onClick={decreaseQuantity}>

-

</button>



<span>

{quantity}

</span>



<button onClick={increaseQuantity}>

+

</button>


</div>


}









<div className="description-box">


<h3 className="description-title">

Description

</h3>



<p className="description-text">

{product.description}

</p>


</div>









<div className="action-buttons">



<button

className="add-cart-btn"

onClick={handleAddToCart}

disabled={product.stock<=0}

>


{

product.stock>0

?

"Add To Cart"

:

"Out Of Stock"

}


</button>







<button

className="buy-now-btn"

onClick={handleBuyNow}

disabled={product.stock<=0}

>


Buy Now


</button>



</div>









<button


className={

isWishlisted

?

"wishlist-btn active"

:

"wishlist-btn"

}


onClick={handleWishlist}


>


<FaHeart/>


{

isWishlisted

?

"Remove Wishlist"

:

"Add To Wishlist"

}


</button>









<div className="feature-container">





<div className="feature-card">


<FaTruck/>


<div>

<h4>
Free Delivery
</h4>


<p>
Fast & Secure Shipping
</p>


</div>


</div>







<div className="feature-card">


<FaShieldAlt/>


<div>

<h4>
Secure Payment
</h4>


<p>
100% Protected
</p>


</div>


</div>







<div className="feature-card">


<FaUndo/>


<div>

<h4>
Easy Return
</h4>


<p>
7 Days Return Policy
</p>


</div>


</div>






</div>






</div>





</div>





</div>


  );


};



export default ProductDetail;