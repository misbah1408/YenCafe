import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push({
        id: action.payload.id,
        category: action.payload.category,
        img: action.payload.img,
        price: action.payload.price,
        title: action.payload.title,
        veg: action.payload.veg,
        quantity: action.payload.quantity,
      });
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
