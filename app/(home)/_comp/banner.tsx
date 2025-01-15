'use client';


import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import bgImage from "./bg.png";



const LandingBanner: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate heading
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      // Animate paragraph
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      // Animate button
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        "-=0.5"
      );
  }, []);

  return (
    <div className="relative  rounded-xl  py-16 md:py-24 lg:py-32">
      {/* Background Image (Optional) */}
      <div
        className="absolute inset-0 bg-cover bg-center  rounded-xl "
      // Uncomment below line if you want to add background image
      // style={{ backgroundImage: `url(${bgImage.src})` }}
      ></div>

      <div className="relative container mx-auto px-4 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          ref={headingRef}
        >
          Multi Service - Your Trusted Technology Partner
        </h1>
        <p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
          ref={paragraphRef}
        >
          At Multi Service, we turn your innovative ideas into reality. As your
          trusted technology partner, we specialize in providing cutting-edge
          solutions to drive your business forward. From startups to established
          enterprises, our team of experts is dedicated to helping you succeed
          through innovative software development, seamless integrations, and
          scalable digital transformation.
        </p>
        <button
          className="border py-3 px-6 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
          ref={buttonRef}

        >
          Let’s Build the Future Together
        </button>
      </div>
    </div>
  );
};

export default LandingBanner;
