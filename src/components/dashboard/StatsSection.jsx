import React from "react";
import { statCardsData } from "../..";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {statCardsData.map(({ icon: Icon, count, title, trend, css }, index) => (
        <div
          key={index}
          className="group relative h-fit bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
        >
          {/* Gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300">
                  {Icon && (
                    <Icon className={`${css} transition-colors duration-300`} />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-tight">
                  {title}
                </p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {count}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      trend.toLowerCase().includes("down")
                        ? "bg-red-50 text-red-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        trend.toLowerCase().includes("down")
                          ? "bg-red-400"
                          : "bg-green-400"
                      }`}
                    />
                    {trend}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      ))}
    </div>
  );
}
