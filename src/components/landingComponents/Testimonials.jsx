import React from "react";
import { Title } from "./Title";
import { testimonials } from "../../../index.js";



const Testimonials = () => {
  return (
    <section className="font-jakarta">
      <div className="text-center">
        <Title
          topTitle={"✅ Trusted by Innovators Worldwide"}
          middleTitle={"What Our Users Say"}
          endTitle={
            "Hear from businesses who’ve transformed their workflows with our solutions"
          }
        />
        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <p className="text-gray-800 mb-4 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="border-r-2 border-dotted px-1">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-600">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={`https://framerusercontent.com/images/tkxhdci1U3ftWlWGdi4BOD5so.jpg?scale-down-to=512`}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <span>Trusted by 5,000+ innovators worldwide</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
