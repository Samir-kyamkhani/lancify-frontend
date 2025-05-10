import { motion } from "framer-motion";
import { Title } from "./Title";
import { FiUsers, FiLink, FiPackage } from "react-icons/fi";
import { features } from "../../index";

export default function ToolServicesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-black/5 rounded-2xl pt-8 sm:py-16 font-jakarta px-4 md:px-12 flex flex-col justify-center items-center space-y-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Title
          topTitle={"Tool services"}
          middleTitle={"Powerful Features, Effortless Management"}
          endTitle={
            "Freelance Flow is packed with tools to help you streamline your workflow, impress clients, and grow your business."
          }
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
        {features.map((item, index) => {
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
              className="bg-white/60 px-8 py-6 rounded-2xl shadow-md transition flex flex-col space-y-5 sm:space-y-8 justify-between"
            >
              <span className="bg-gray-100 shadow-lg p-2.5 w-fit h-fit rounded-lg">
                <Icon className="text-3xl text-blue-600" />
              </span>
              <div className="flex flex-col sm:gap-y-2.5">
                <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
        className="sm:flex justify-evenly hidden mt-12 w-full text-sm text-gray-500 font-medium"
      >
        <div className="flex items-center gap-2">
          <FiUsers className="text-base" />
          Expert Collaboration
        </div>
        <div className="flex items-center gap-2">
          <FiLink className="text-base" />
          Seamless Integration
        </div>
        <div className="flex items-center gap-2">
          <FiPackage className="text-base" />
          Scalable Solutions
        </div>
      </motion.div>
    </motion.section>
  );
}
