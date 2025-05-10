import React from "react";
import { motion } from "framer-motion";
import { statCardsData } from "../..";

export default function StatsSection() {
  return (
    <div className="flex flex-wrap gap-6">
      {statCardsData.map(({ icon: Icon, count, title, trend, css }, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all flex-1 min-w-[200px] flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="p-3 rounded-full bg-gray-100 flex items-center justify-center">
            {Icon && <Icon className={css} />}
          </div>
          <div className="space-y-1">
            <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wide">
              {title}
            </p>
            <h3 className="text-2xl font-semibold text-gray-800">{count}</h3>
            <p
              className={`text-xs ${
                trend.toLowerCase().includes("down")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {trend}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
