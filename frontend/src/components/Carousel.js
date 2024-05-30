import React, { useState, useEffect } from 'react';
import { img1, img2, img3 } from '../utils/Constants';

const images = [img1, img2, img3];
const captions = [
  { title: "Nourishing Your Body and Soul", text: `"Let food be thy medicine and medicine be thy food." ` },
  { title: "Fuel for a Vibrant Life", text: '"Eat food, not too much, mostly plants."' },
  { title: "The Foundation of Wellness", text: '"To eat is a necessity, but to eat intelligently is an art."' },
];

function CarouselPage() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrent((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[250px] md:h-[400px] relative overflow-hidden mt-1">
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, index) => (
          <div key={index} className="min-w-full relative">
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-[400px] object-cover object-center" />
            <div className="absolute bottom-44 md:bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white">
              <h3 className="text-md text-nowrap md:text-2xl font-bold">{captions[index].title}</h3>
              <p className="text-xs md:text-lg text-nowrap ">{captions[index].text}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-md">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-md">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default CarouselPage;
