"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCard from "./_comp/service";
import CommonService from "./_comp/commonService";
import LandingBanner from "./_comp/banner";
import CustomServiceCard from "./_comp/customService";
import Testimonial from "./_comp/testimonial";
import OurTeam from "./_comp/teams";
import Contacts from "./_comp/contact/contacts";

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fade-in",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".slide-in",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".slide-in",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".scale-in",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".scale-in",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <main>
      <LandingBanner />
      <div className="my-10">
        <h4 className="py-4 text-3xl text-center font-bold text-primary_dark mb-8 bg-primary_light_2 fade-in">
          Services
        </h4>
        <div className="fade-in">
          <ServiceCard />
        </div>
      </div>
      <div className="my-10">
        <h4 className="py-4 bg-primary_light_2 text-3xl text-center font-bold text-primary_dark mb-8 slide-in">
          Custom Services
        </h4>
        <div className="slide-in">
          <CustomServiceCard />
        </div>
      </div>
      <div className="my-10">
        <h4 className="py-4 bg-primary_light_2 text-3xl text-center font-bold text-primary_dark mb-8 scale-in">
          Common Services
        </h4>
        <div className="scale-in">
          <CommonService />
        </div>
      </div>
      <div>
        <Testimonial />
      </div>
      <div>
        <h4 className="py-4 bg-primary_light_2 text-3xl text-center font-bold text-primary_dark mb-8">
          Our Team
        </h4>
        <OurTeam />
      </div>

      <div className="my-10 scale-in">
    <Contacts />
      </div>

      {/* <div className="my-10"></div> */}
    </main>
  );
};

export default HomePage;
