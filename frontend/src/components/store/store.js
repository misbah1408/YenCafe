// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import locationSlice from "./locationSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    location: locationSlice
  },
});
