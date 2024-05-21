import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Body from "../src/components/Body";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Menu from "../src/components/Menu";
import Home from "../src/components/Home";
import Cart from "../src/components/Cart";
import ItemsDis from "../src/components/ItemsDis";
import MyOrder from "./components/MyOrder";
import { CartProvider } from "./components/store/ContextReducer";
import Admin from "./components/Admin/Admin";
import { isAdmin } from "./utils/Constants";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/menu/:id" element={<ItemsDis />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={isAdmin ? <Admin /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
