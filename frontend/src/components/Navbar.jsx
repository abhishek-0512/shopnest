import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";

import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiHome,
  FiGrid,
  FiSearch,
  FiHeart,
} from "react-icons/fi";

import "../styles/navbar.css";


const Navbar = () => {


  const { user, logout } = useContext(AuthContext);


  const navigate = useNavigate();



  const [menuOpen,setMenuOpen] = useState(false);

  const [search,setSearch] = useState("");





  const cartItems = useSelector(
    state => state.cart.cartItems
  ) || [];



  const wishlistItems = useSelector(
    state => state.wishlist.items
  ) || [];









  const handleLogout = ()=>{

    logout();

    setMenuOpen(false);

    navigate("/login");

  };









  const handleSearch = (e)=>{

    e.preventDefault();


    if(search.trim()){

      navigate(
        `/shop?search=${search}`
      );

      setSearch("");

    }


  };









  return (

<nav className="navbar">



{/* LOGO */}

<div className="navbar-brand">


<NavLink
to="/"
onClick={()=>setMenuOpen(false)}
>


<img

src="/logo.png"

alt="ShopNest"

className="navbar-logo"

/>


<span>
ShopNest
</span>


</NavLink>


</div>







{/* SEARCH */}

<form

className="navbar-search"

onSubmit={handleSearch}

>


<input

type="text"

placeholder="Search products..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<button type="submit">

<FiSearch/>

</button>



</form>








{/* MOBILE MENU */}

<button

className="menu-icon"

onClick={()=>setMenuOpen(!menuOpen)}

>


{

menuOpen ?

<FiX/>

:

<FiMenu/>

}


</button>








<ul

className={`navbar-links ${
menuOpen ? "active" : ""
}`}

>





<li>

<NavLink

to="/"

onClick={()=>setMenuOpen(false)}

>

<FiHome/>

Home


</NavLink>

</li>







<li>

<NavLink

to="/shop"

onClick={()=>setMenuOpen(false)}

>


<FiGrid/>

Shop


</NavLink>

</li>









{/* WISHLIST */}

<li>


<NavLink

to="/wishlist"

onClick={()=>setMenuOpen(false)}

>


<div className="cart-wrapper">


<FiHeart/>


<span>
Wishlist
</span>



{

wishlistItems.length > 0 &&

<span className="cart-count">

{wishlistItems.length}

</span>

}



</div>


</NavLink>


</li>









{/* CART */}

<li>


<NavLink

to="/cart"

onClick={()=>setMenuOpen(false)}

>


<div className="cart-wrapper">


<FiShoppingCart/>


<span>
Cart
</span>



{

cartItems.length > 0 &&

<span className="cart-count">

{cartItems.length}

</span>

}


</div>


</NavLink>


</li>









{

user ? (

<>


<li>


<NavLink

to="/myorders"

onClick={()=>setMenuOpen(false)}

>


<FiUser/>

{user.name}


</NavLink>


</li>







{

user.role==="admin" &&

<li>


<NavLink

to="/add-product"

onClick={()=>setMenuOpen(false)}

>

Add Product

</NavLink>


</li>


}








<li>


<button

className="btn-logout"

onClick={handleLogout}

>


<FiLogOut/>

Logout


</button>


</li>



</>


)

:

(

<li>

<NavLink

to="/login"

onClick={()=>setMenuOpen(false)}

>


<FiUser/>

Login


</NavLink>


</li>

)


}



</ul>


</nav>

  );


};


export default Navbar;