import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import locationSlice from "./locationSlice";

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    // console.log(serializedState)
    if (serializedState === null) {
      return undefined; 
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    // console.log(serializedState);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

// Load state from localStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    location: locationSlice,
  },
  preloadedState: persistedState, // Use preloadedState for persisted state
});

// Subscribe to store changes and save the state to localStorage
store.subscribe(() => {
  saveState({
    user: store.getState().user,
    cart: store.getState().cart,
  });
});
