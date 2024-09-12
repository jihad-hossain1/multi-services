"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { services } from "@/public/servicejson";
import Image from "next/image";

const TestimonialCarousel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials = services?.testimonials || [];
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Function to handle page navigation (next/prev)
  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  // Move to a specific page based on the index
  const handleIndicatorClick = (index: number) => {
    setCurrentPage(index);
  };

  // Animate the carousel using gsap when the current page changes
  useEffect(() => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: -currentPage * 100 + "%", // Shift the carousel
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [currentPage]);

  // Animate the middle card on each page load
  useEffect(() => {
    const middleCardIndex = Math.floor(testimonialsPerPage / 2);
    const middleCard = document.querySelectorAll(".testimonial-card")[middleCardIndex];

    if (middleCard) {
      gsap.fromTo(
        middleCard,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 0.8,
          ease: "power2.out",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }
      );
    }
  }, [currentPage]);

  // Hover animation for each card using gsap
  const handleCardMouseEnter = (event: React.MouseEvent<HTMLDivElement>, isMiddleCard: boolean) => {
    if (isMiddleCard) {
      // More pronounced hover effect for the middle card
      gsap.to(event.currentTarget, {
        scale: 1.15,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)",
      });
    } else {
      // Regular hover effect for other cards
      gsap.to(event.currentTarget, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      });
    }
  };

  const handleCardMouseLeave = (event: React.MouseEvent<HTMLDivElement>, isMiddleCard: boolean) => {
    if (isMiddleCard) {
      // Restore the middle card to its original larger scale
      gsap.to(event.currentTarget, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      });
    } else {
      // Restore regular scale for other cards
      gsap.to(event.currentTarget, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      });
    }
  };

  // Group testimonials into pages of 3 items each
  const paginatedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += testimonialsPerPage) {
    paginatedTestimonials.push(testimonials.slice(i, i + testimonialsPerPage));
  }

  return (
    <section className="py-10">
      <div className="w-11/12 mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>

        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-out gap-5 my-4"
            style={{ width: `${totalPages * 100}%` }}
          >
            {paginatedTestimonials.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="flex gap-5 w-full"
                style={{ width: `${100 / totalPages}%` }}
              >
                {page.map((testimonial, index) => {
                  // Determine the middle card on the page
                  const isMiddleCard = index === Math.floor(testimonialsPerPage / 2);
                  return (
                    <div
                      key={index}
                      className={`testimonial-card bg-primary_light shadow-lg rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 flex-shrink-0 transition-transform duration-300 ${
                        isMiddleCard ? "active-card" : ""
                      }`}
                      onMouseEnter={(event) => handleCardMouseEnter(event, isMiddleCard)}
                      onMouseLeave={(event) => handleCardMouseLeave(event, isMiddleCard)}
                    >
                      <p className="text-primary_light_5 mb-4">
                        {testimonial.testimonial}
                      </p>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Image
                            width={50}
                            height={50}
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
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Show Next/Prev Buttons only if multiple pages */}
        {totalPages > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-primary_dark text-primary_light_2 px-2 py-1 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-primary_dark text-primary_light_2 px-2 py-1 rounded-full"
            >
              &gt;
            </button>
          </>
        )}

        {/* Indicators, shown only if more than 1 page */}
        {totalPages > 1 && (
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-8 h-2 rounded-full transition-colors duration-300 ease-in-out ${
                  index === currentPage
                    ? "bg-primary_light_5"
                    : "bg-primary_light_2"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
