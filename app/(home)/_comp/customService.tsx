"use client";

import React, { useState } from "react";
import { services } from "@/public/servicejson";

const CustomServiceCard: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <div className="border-[1px]  border-zinc-700 shadow-[0_1.2px_1.2px_rgba(66,155,43,0.2)] rounded-lg p-6 w-full max-w-3xl ">
        <h2 className="text-3xl font-bold text-center mb-4">
          {services?.custom_service.name}
        </h2>

        {/* Plan Selector */}
        <div className="flex justify-center mb-6 space-x-4">
          {services?.custom_service.plans.map((plan, index) => (
            <button
              key={index}
              onClick={() => setSelectedPlan(index)}
              className={`py-2 px-4 font-semibold rounded-lg focus:outline-none transition-all ${selectedPlan === index
                ? "bg-zinc-700/95"
                : " hover:bg-zinc-700"
                }`}
            >
              {plan.plan_name}
            </button>
          ))}
        </div>

        {/* Plan Details with Smooth Transition */}
        <div className="overflow-hidden">
          <div
            className="transition-all duration-500"
            style={{
              transform: `translateX(-${selectedPlan * 100}%)`,
              display: "flex",
              width: `${services?.custom_service.plans.length * 100}%`,
            }}
          >
            {services?.custom_service.plans.map((plan, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full"
                style={{ width: "100%" }}
              >
                <h3 className="text-xl font-semibold mb-2">
                  {plan.plan_name}
                </h3>
                <p className=" mb-4">{plan.description}</p>
                <p className="font-semibold mb-4">
                  Cost: ${plan.cost.min} - ${plan.cost.max}
                </p>
                <ul className="list-disc list-inside mb-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomServiceCard;
