import React from "react";
import Categories from "./Categories";
import Dishes from "./Dishes";
import CarouselPage from "./Carousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center mt-20">
      <CarouselPage />
      <Categories />
      <Dishes />
    </div>
  );
}
