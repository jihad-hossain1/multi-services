import React from "react";
import bgImage from "./bg.png";

const LandingBanner: React.FC = () => {
  return (
    <div className="relative bg-gray-800 text-white py-16 md:py-24 lg:py-32">
      {/* Background Image (Optional) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 rounded-xl"
        style={{ backgroundImage: "url(" + bgImage.src + ")" }}
      ></div>

      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Venture Buddy - Your Trusted Technology Partner
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          At Venture Buddy, we turn your innovative ideas into reality. As your
          trusted technology partner, we specialize in providing cutting-edge
          solutions to drive your business forward. From startups to established
          enterprises, our team of experts is dedicated to helping you succeed
          through innovative software development, seamless integrations, and
          scalable digital transformation.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
          Let’s Build the Future Together
        </button>
      </div>

      {/* Decorative Animation (Optional) */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-lg animate-pulse"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 rounded-full opacity-50 blur-lg animate-pulse"></div>
    </div>
  );
};

export default LandingBanner;
