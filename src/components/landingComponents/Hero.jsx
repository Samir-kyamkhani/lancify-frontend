import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosPlayCircle } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { cards, features } from "../../index.js";

const Hero = () => {
  return (
    <div className="min-h-screen py-16 sm:px-8 font-jakarta">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Everything You Need to Manage Your Freelance
          <br />
          Business in One Place
        </h1>
        <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Streamline your proposals, clients, projects, and payments with an
          all-in-one platform designed for freelancers and agencies.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/signup"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Get Started <MdArrowOutward size={18} />
          </Link>
          <button className="flex items-center gap-2 border border-gray-300 bg-white px-5 py-3 rounded-xl text-gray-800 shadow-md transition font-medium cursor-pointer">
            <IoIosPlayCircle size={22} /> Watch Demo
          </button>
        </div>
      </motion.div>

      {/* Card Section */}
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-4 sm:px-0 justify-center">
        {features.slice(0, 3).map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/60 px-8 py-6 rounded-2xl shadow-md transition flex flex-col space-y-4 justify-between items-center"
            >
              <span className="bg-gray-100 shadow-lg p-2.5 w-fit h-fit rounded-lg">
                <Icon className="text-3xl text-blue-600" />
              </span>
              <div className="flex flex-col sm:gap-y-2.5 items-center">
                <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm text-center">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sales Chart Placeholder */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/dashboard.jpeg"
          alt="Dashboard preview"
          className="w-full rounded-xl shadow-md"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
