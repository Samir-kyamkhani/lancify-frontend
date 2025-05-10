import { useState } from "react";
import { Title } from "./Title.jsx";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { basePlans } from "../../index.js";
import { AiFillFire } from "react-icons/ai";

const PricingSection = () => {
  const [billing, setBilling] = useState("monthly");
  const defaultPlanIndex = basePlans.findIndex((plan) => plan.title === "Pro");
  const [selectedPlan, setSelectedPlan] = useState(defaultPlanIndex);

  return (
    <div className="bg-black/5 rounded-2xl pt-8 sm:py-16 font-jakarta px-4 md:px-12" id="pricing">
      <div className="text-center flex flex-col justify-center items-center">
        <Title
          topTitle={"Transparent Pricing, No Surprises"}
          middleTitle={"Simple, Transparent Pricing"}
          endTitle={
            "Choose the plan that's right for you. No hidden fees, cancel anytime."
          }
        />

        {/* Toggle */}
        <div className="mt-6 inline-flex bg-white rounded-full shadow-sm text-sm font-medium p-1">
          <button
            className={`px-4 py-2 rounded-full cursor-pointer ${
              billing === "monthly" ? "bg-gray-900 text-white" : "text-gray-700"
            }`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full cursor-pointer ${
              billing === "yearly" ? "bg-gray-900 text-white" : "text-gray-700"
            }`}
            onClick={() => setBilling("yearly")}
          >
            Yearly
          </button>
          <span className="px-4 py-2 text-blue-600 font-semibold">
            Save 20%
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full justify-items-center py-8 gap-y-8 sm:gap-y-0 px-4">
          {basePlans.map((plan, idx) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly;
            const isSelected = selectedPlan === idx;

            return (
              <div
                key={idx}
                className={`relative p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all text-left w-full sm:w-4/5 cursor-pointer duration-700 ${
                  isSelected
                    ? "border-2 border-blue-600 scale-105 z-10"
                    : "border-0"
                }`}
                onClick={() => setSelectedPlan(idx)}
              >
                {/* Plan Tag with Fire Icon */}
                {plan.tag && (
                  <span className="absolute top-4 right-4 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    <AiFillFire size={16} />
                    {plan.tag}
                  </span>
                )}
                <h4 className="text-lg font-semibold mb-2">{plan.title}</h4>
                <div className="text-3xl font-bold mb-1">${price}</div>
                <p className="text-sm text-gray-500 mb-4">
                  {billing === "monthly" ? "per month" : "per year"}
                </p>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold text-sm ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Get Started
                </button>

                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <IoMdCheckmarkCircleOutline fontSize={20} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
