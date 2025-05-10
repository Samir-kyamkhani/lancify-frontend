import { motion } from "framer-motion";


export const Title = ({ topTitle, middleTitle, endTitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center gap-y-2"
    >
      <span className="text-xs font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
        {topTitle}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold sm:mt-4">{middleTitle}</h2>
      <p className="mt-2 w-2/3">{endTitle}</p>
    </motion.div>
  );
};