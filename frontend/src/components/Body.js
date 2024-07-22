import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Body() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer className="w-[100%] mt-9">
        <Footer />
      </footer> */}
    </>
  );
}
