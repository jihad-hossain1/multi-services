"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { services } from "@/public/servicejson";
export function debounce(fn: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const ServiceCard: React.FC = () => {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Debounced animation function
  const debouncedAnimate = useCallback(
    debounce(() => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.2 }
      );
    }, 300), // Adjust debounce delay as needed
    []
  );

  useEffect(() => {
    // Trigger initial animation
    debouncedAnimate();

    // Set up event listeners for dynamic animations
    const handleResize = () => debouncedAnimate();
    window.addEventListener("resize", handleResize);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debouncedAnimate]);

  useEffect(() => {
    // Add hover animation using GSAP
    const handleMouseEnter = (card: HTMLDivElement) => {
      gsap.to(card, {
        scale: 1.1,
        backgroundColor: "#e0e0e0",
        duration: 0.3,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = (card: HTMLDivElement) => {
      gsap.to(card, {
        scale: 1,
        backgroundColor: "#fff",
        duration: 0.3,
        ease: "power1.out",
      });
    };

    cardRefs.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => handleMouseEnter(card));
        card.addEventListener("mouseleave", () => handleMouseLeave(card));
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => handleMouseEnter(card));
          card.removeEventListener("mouseleave", () => handleMouseLeave(card));
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {services?.services?.map((service, index) => (
        <div
          key={index}
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              cardRefs.current[index] = el;
            }
          }}
          className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 lg:w-1/4 transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-100 duration-300"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {service.name}
          </h2>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <p className="font-semibold text-blue-500 mb-4">
            Cost: {service.cost}
          </p>
          <ul className="list-disc list-inside text-gray-500">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;

// "use client";

// import React, { useEffect, useRef } from "react";
// import { services } from "@/public/servicejson";
// import { gsap } from "gsap";

// const ServiceCard: React.FC = () => {
//   const cardRefs = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     gsap.fromTo(
//       cardRefs.current,
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.2 }
//     );
//   }, []);

//   return (
//     <div className="flex flex-wrap justify-center gap-6 p-4">
//       {services?.services?.map((service, index) => (
//         <div
//           key={index}
//           ref={(el) => (cardRefs.current[index] = el!)}
//           className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 lg:w-1/4 transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-100 duration-300"
//         >
//           <h2 className="text-xl font-bold text-gray-800 mb-4">
//             {service.name}
//           </h2>
//           <p className="text-gray-600 mb-4">{service.description}</p>
//           <p className="font-semibold text-blue-500 mb-4">
//             Cost: {service.cost}
//           </p>
//           <ul className="list-disc list-inside text-gray-500">
//             {service.features.map((feature, featureIndex) => (
//               <li key={featureIndex}>{feature}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ServiceCard;
