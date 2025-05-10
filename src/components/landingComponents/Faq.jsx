import { useState } from "react";
import { faqs } from "../../index";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <p className="text-blue-500 uppercase text-xs font-semibold tracking-wide mb-2">
        Your Queries, Simplified
      </p>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10">
        Questions? Answers!
      </h2>

      <div className="space-y-4 text-left">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between cursor-pointer items-center w-full px-5 py-4 text-left text-gray-800 font-medium text-base"
            >
              {faq.question}
              <FiChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index
                    ? "rotate-180 text-blue-600"
                    : "text-gray-400"
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-600 text-sm duration-700">
                {faq.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Still have questions? Reach out at{" "}
        <a href="mailto:alter@support.com" className="text-blue-600 underline">
          demo@gmail.com
        </a>
      </p>
    </div>
  );
};
