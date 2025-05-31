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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-gray-800">
      {/* FAQ Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <FiHelpCircle className="text-blue-600 text-2xl sm:text-3xl" />
          <h2 className="text-2xl sm:text-3xl font-bold">FAQs</h2>
        </div>
        <p className="text-gray-600 mb-6 ml-8 sm:ml-12 text-sm sm:text-base">
          Quick answers to common questions about Freelance Flow.
        </p>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <details
              key={index}
              className="group border border-slate-200 px-6 py-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md transition-all hover:shadow-lg"
            >
              <summary className="flex items-center justify-between cursor-pointer text-lg font-medium text-gray-900">
                {item.question}
                <FaChevronDown className="text-gray-400 group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-white/60 backdrop-blur-lg p-6 sm:p-10 rounded-3xl shadow-xl transition-all hover:shadow-2xl">
        <div className="flex items-center gap-3 mb-5">
          <FiMail className="text-blue-600 text-2xl" />
          <h2 className="text-2xl font-semibold">Contact Support</h2>
        </div>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Can't find your answer? Reach out and we’ll respond as soon as we can.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name *
              </label>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
                <FiUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Email *
              </label>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
                <FiMail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject *</label>
            <input
              type="text"
              placeholder="Briefly describe your issue"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message *</label>
            <div className="relative">
              <textarea
                rows="5"
                placeholder="Tell us how we can help..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
              ></textarea>
              <FiMessageSquare className="absolute top-3 right-3 text-gray-300" />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all"
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
