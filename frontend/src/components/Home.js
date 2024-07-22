import React from "react";
import Categories from "./Categories";
import Dishes from "./Dishes";
import CarouselPage from "./Carousel";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center mt-20">
      <CarouselPage />
      <Categories />
      <Dishes />
      <footer className="w-[100%] mt-9">
        <Footer />
      </footer>
    </div>
  );
}
