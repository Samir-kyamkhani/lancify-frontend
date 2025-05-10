import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebookF,
  FaGoogle,
  FaTiktok,
  FaGithub,
} from "react-icons/fa";
import { Title } from "./Title";

const icons = [
  { icon: <FaLinkedin />, x: "10%", y: "10%" },
  { icon: <FaFacebookF />, x: "25%", y: "40%" },
  { icon: <FaGoogle />, x: "10%", y: "75%" },
  { icon: <FaTwitter />, x: "90%", y: "10%" },
  { icon: <FaTiktok />, x: "70%", y: "40%" },
  { icon: <FaGithub />, x: "90%", y: "75%" },
];



const SocialMediaIntegration = () => {
  return (
    <div className="w-full bg-black/5 rounded-2xl py-20 px-4 text-center font-jakarta my-10">
      <div>
        <Title
          topTitle={"Integration"}
          middleTitle={"Seamlessly connects"}
          endTitle={"with the tools you already use and love."}
        />
        {/* Desktop view (with SVG lines + center icon) */}
        <div className="relative mt-20 w-full h-[480px] sm:h-[500px] hidden lg:block">
          {/* SVG Lines */}
          <svg
            className="absolute w-full h-full z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {[
              { d: "M 10 10 C 40 10, 40 50, 50 50" },
              { d: "M 30 40 C 30 40, 40 50, 50 50" },
              { d: "M 10 75 C 35 75, 40 50, 50 50" },
              { d: "M 90 10 C 60 10, 60 50, 50 50" },
              { d: "M 70 40 C 70 40, 60 50, 50 50" },
              { d: "M 90 75 C 65 75, 60 50, 50 50" },
            ].map((line, index) => (
              <path
                key={index}
                d={line.d}
                stroke="#648091"
                strokeWidth="0.6"
                strokeDasharray="2,2"
                fill="none"
              />
            ))}
          </svg>

          {/* Center Icon */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-xl z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-xl">🔗</span>
          </motion.div>

          {/* Integration Icons */}
          {icons.map((item, i) => (
            <motion.div
              key={i}
              className="absolute w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 -mt-7"
              style={{
                left: item.x,
                top: item.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className="text-xl">{item.icon}</span>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Small Screen Grid (2x3 icons) */}
        <div className="grid grid-cols-2 gap-6 justify-center items-center mt-10 lg:hidden">
          {[
            FaLinkedin,
            FaFacebookF,
            FaGoogle,
            FaTwitter,
            FaTiktok,
            FaGithub,
          ].map((Icon, i) => (
            <motion.div
              key={i}
              className="mx-auto rounded-xl bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 w-20 h-20 sm:w-24 sm:h-24"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Icon className="text-4xl" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Features */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            ⚙️ <span>Seamless Automation</span>
          </div>
          <div className="flex items-center gap-2">
            🔄 <span>Real-Time Data Sync</span>
          </div>
          <div className="flex items-center gap-2">
            🛠️ <span>Customizable Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIntegration;
