"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
// import { useScrollTrigger } from "@gsap/react";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-primary_light_4 text-primary_light py-6 mt-10"
    >
      <div className="container px-4  mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h4 className="text-xl font-bold mb-4">Our IT Services</h4>
          <ul className="flex gap-3 list-disc-none">
            <li>Custom Software Development</li>
            <li>Cloud Solutions</li>
            <li>IT Consulting</li>
            <li>Cybersecurity</li>
            <li>Technical Support</li>
          </ul>
          <div className="mt-6">
            <p>
              © {new Date().getFullYear()} Venture Buddy. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
