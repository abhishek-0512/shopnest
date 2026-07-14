import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  FaTrash,
  FaShoppingCart,
  FaEye
} from "react-icons/fa";


import {
  removeFromWishlist
} from "../redux/wishlistSlice";


import {
  addToCart
} from "../redux/cartSlice";


import { toast } from "react-toastify";


import "../styles/wishlist.css";





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









const Wishlist = ()=>{


  const dispatch = useDispatch();


  const navigate = useNavigate();





  const wishlistItems = useSelector(

    state=>state.wishlist.items

  ) || [];









  const moveToCart = (product)=>{



    if(product.stock <= 0){


      toast.error(
        "Product is out of stock"
      );


      return;


    }






    dispatch(

      addToCart({


        productId:product.productId,


        name:product.name,


        price:product.price,


        imageUrl:product.imageUrl,


        brand:product.brand,


        stock:product.stock,


        qty:1


      })

    );







    dispatch(

      removeFromWishlist(
        product.productId
      )

    );





    toast.success(

      `${product.name} added to cart 🛒`

    );



  };









  const removeItem=(id)=>{


    dispatch(

      removeFromWishlist(id)

    );



    toast.info(
      "Removed from wishlist"
    );


  };









  return(



<div className="wishlist-container">





<h1>

My Wishlist ❤️

</h1>








{

wishlistItems.length===0 ?



(


<div className="empty-wishlist">



<h2>

Your wishlist is empty

</h2>




<Link to="/shop">

Continue Shopping

</Link>



</div>


)

:

(



<div className="wishlist-grid">







{

wishlistItems.map((product)=>(




<div

className="wishlist-card"

key={product.productId}

>







<img


src={getImageSrc(product.imageUrl)}


alt={product.name}



onError={(e)=>{


e.target.onerror=null;


e.target.src="/placeholder.png";


}}


/>









<div className="wishlist-info">





<h3>

{product.name}

</h3>








<p>


₹
{Number(product.price || 0)

.toLocaleString("en-IN")}



</p>









<div className="wishlist-actions">






<button


onClick={()=>moveToCart(product)}



disabled={product.stock<=0}



>


<FaShoppingCart/>


{

product.stock>0

?

"Add Cart"

:

"Out Of Stock"

}



</button>








<button


className="view-btn"


onClick={()=>navigate(

`/product/${product.productId}`

)}


>


<FaEye/>


</button>








<button


className="delete-btn"



onClick={()=>removeItem(

product.productId

)}


>


<FaTrash/>



</button>








</div>









</div>







</div>





))


}






</div>




)

}





</div>



  );


};






export default Wishlist;