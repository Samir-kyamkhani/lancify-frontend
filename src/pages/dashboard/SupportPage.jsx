import React from "react";
import {
  FiHelpCircle,
  FiMail,
  FiUser,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { faqData } from "../..";


const SupportPage = () => {
  return (
    <div className="max-w-6xl  py-4 text-gray-800">
      {/* FAQ Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <FiHelpCircle className="text-blue-600 text-xl sm:text-3xl" />
          <h2 className="text-xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <p className="text-gray-600 mb-6 ml-7 sm:ml-10 text-sm sm:text-base">
          Find quick answers to common questions about Freelance Flow.
        </p>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <details
              key={index}
              className="group border-b border-gray-200 px-4 py-3 bg-gray-50 hover:bg-white transition rounded-lg"
            >
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-base sm:text-lg text-gray-800">
                {item.question}
                <FaChevronDown className="ml-2 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-2 text-gray-700 text-sm sm:text-base leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <FiMail className="text-blue-600 text-2xl" />
          <h2 className="text-xl sm:text-2xl font-semibold">Contact Support</h2>
        </div>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Can’t find your answer? Reach out and we'll help you as soon as possible.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name *</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                <FiUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full outline-none bg-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Your Email *</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                <FiMail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full outline-none bg-transparent text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject *</label>
            <input
              type="text"
              placeholder="Briefly describe your issue"
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message *</label>
            <div className="relative">
              <textarea
                rows="5"
                placeholder="Tell us how we can help..."
                className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
              ></textarea>
              <FiMessageSquare className="absolute top-3 right-3 text-gray-300" />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition duration-200"
          >
            <FiSend />
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default SupportPage;
