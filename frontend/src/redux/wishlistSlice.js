import { createSlice } from "@reduxjs/toolkit";


const savedWishlist = localStorage.getItem("wishlist");


const initialState = {

  items: savedWishlist
    ? JSON.parse(savedWishlist)
    : []

};





const wishlistSlice = createSlice({

  name:"wishlist",


  initialState,


  reducers:{


    addToWishlist:(state,action)=>{


      const exists = state.items.some(

        item => 
        item.productId === action.payload.productId

      );



      if(!exists){

        state.items.push(action.payload);

      }


    },








    removeFromWishlist:(state,action)=>{


      state.items = state.items.filter(

        item =>
        item.productId !== action.payload

      );


    },








    clearWishlist:(state)=>{


      state.items=[];


    }


  }


});







export const {

  addToWishlist,

  removeFromWishlist,

  clearWishlist

}=wishlistSlice.actions;




export default wishlistSlice.reducer;