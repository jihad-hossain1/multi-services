"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { services } from "@/public/servicejson";

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to move to the next testimonial
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (services?.testimonials.length || 1)
    );
  };

  // Function to move to the previous testimonial
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (services?.testimonials.length || 0)) %
        (services?.testimonials.length || 1)
    );
  };

  // Function to move to a specific testimonial based on index
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Function to autoplay the carousel
  const startAutoplay = () => {
    intervalRef.current = setInterval(handleNext, 3000); // Change slide every 3 seconds
  };

  // Function to stop autoplay
  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Use effect to handle carousel animation
  useEffect(() => {
    const animateCarousel = () => {
      if (carouselRef.current) {
        gsap.to(carouselRef.current, {
          x: -currentIndex * 100 + "%",
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    animateCarousel();
  }, [currentIndex]);

  // Use effect to start autoplay and cleanup on unmount
  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  }, []);

  // Hover animation using GSAP
  const handleCardMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    });
  };

  const handleCardMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    });
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>
        <div
          className="relative overflow-hidden"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div
            ref={carouselRef}
            className="flex transition-transform duration-800 ease-out gap-5 my-4"
          >
            {services?.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-primary_light shadow-lg rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 flex-shrink-0 transition-transform duration-300"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <p className="text-primary_light_5 mb-4">
                  {testimonial.testimonial}
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={`https://via.placeholder.com/50?text=${testimonial.name.charAt(
                        0
                      )}`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-primary_dark">
                      {testimonial.name}
                    </p>
                    <p className="text-primary_light_5">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary_dark text-primary_light_2 p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary_dark text-primary_light_2 p-2 rounded-full"
          >
            &gt;
          </button>
          {/* Indicators */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {services?.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-6 h-3 rounded-full transition-colors duration-300 ease-in-out ${
                  index === currentIndex
                    ? "bg-primary_light_5"
                    : "bg-primary_light_2"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
