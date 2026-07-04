import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const cart = localStorage.getItem("cartItems");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

const saveCart = (cartItems) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

const initialState = {
  cartItems: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );

      if (existingItem) {
        existingItem.qty = item.qty;
        existingItem.price = item.price;
        existingItem.name = item.name;
        existingItem.imageUrl = item.imageUrl;
        existingItem.stock = item.stock;
      } else {
        state.cartItems.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          stock: item.stock,
          qty: item.qty,
        });
      }

      saveCart(state.cartItems);
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productId === action.payload
      );

      if (item && item.qty < item.stock) {
        item.qty += 1;
      }

      saveCart(state.cartItems);
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productId === action.payload
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      }

      saveCart(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );

      saveCart(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;