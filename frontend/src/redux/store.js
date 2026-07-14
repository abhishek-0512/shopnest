import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";



const store = configureStore({

  reducer: {

    cart: cartReducer,

    wishlist: wishlistReducer,

  },


  devTools: import.meta.env.DEV,


});





/* =====================================================
   SAVE REDUX DATA TO LOCAL STORAGE
===================================================== */


store.subscribe(()=>{


  const state = store.getState();




  localStorage.setItem(

    "cartItems",

    JSON.stringify(

      state.cart.cartItems

    )

  );






  localStorage.setItem(

    "wishlist",

    JSON.stringify(

      state.wishlist.items

    )

  );



});






export default store;