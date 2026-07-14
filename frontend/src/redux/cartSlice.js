import { createSlice } from "@reduxjs/toolkit";



/* =====================================================
   LOAD CART FROM LOCAL STORAGE
===================================================== */

const loadCart = ()=>{


  try{


    const cart = localStorage.getItem("cartItems");


    if(!cart){

      return [];

    }



    const parsedCart = JSON.parse(cart);



    if(!Array.isArray(parsedCart)){

      return [];

    }



    return parsedCart.filter(

      item =>

      item &&

      item.productId &&

      item.name &&

      item.price !== undefined

    );



  }

  catch(error){


    console.error(
      "Cart loading error:",
      error
    );


    return [];


  }


};







const initialState = {


  cartItems:loadCart()


};








const cartSlice = createSlice({


  name:"cart",


  initialState,



  reducers:{



    addToCart:(state,action)=>{


      const item = action.payload;



      const existingItem = state.cartItems.find(

        cartItem =>

        cartItem.productId === item.productId

      );




      if(existingItem){


        if(existingItem.qty < existingItem.stock){

          existingItem.qty += 1;

        }



        existingItem.name=item.name;

        existingItem.price=item.price;

        existingItem.imageUrl=item.imageUrl;

        existingItem.stock=item.stock;


      }



      else{


        state.cartItems.push({


          productId:item.productId,


          name:item.name,


          price:item.price,


          imageUrl:item.imageUrl || "",


          stock:item.stock || 1,


          qty:item.qty || 1


        });


      }


    },









    increaseQty:(state,action)=>{


      const item = state.cartItems.find(

        cartItem =>

        cartItem.productId === action.payload

      );



      if(item && item.qty < item.stock){


        item.qty += 1;


      }


    },









    decreaseQty:(state,action)=>{


      const item = state.cartItems.find(

        cartItem =>

        cartItem.productId === action.payload

      );



      if(item && item.qty > 1){


        item.qty -= 1;


      }


    },









    removeFromCart:(state,action)=>{


      state.cartItems = state.cartItems.filter(

        item =>

        item.productId !== action.payload

      );


    },









    clearCart:(state)=>{


      state.cartItems=[];


    },









    resetCart:(state)=>{


      state.cartItems=[];


    }



  }


});








export const {


  addToCart,

  increaseQty,

  decreaseQty,

  removeFromCart,

  clearCart,

  resetCart


}=cartSlice.actions;






export default cartSlice.reducer;