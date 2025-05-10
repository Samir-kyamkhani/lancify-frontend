import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from next/link
import { Faq } from "../../components/landingComponents/Faq";

export default function ContactPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-20">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 mb-24 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          {/* Email Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-200 flex items-start gap-4"
          >
            <div>
              <FiMail className="text-3xl mt-1 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Email Us
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                Facing technical challenges or product concerns? We're here to assist.
              </p>
              <p className="text-sm font-medium text-blue-600">alter@support.com</p>
            </div>
          </motion.div>

          {/* Social Media Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-200 flex  flex-col gap-4 w-fit"
          >
            <div className="flex justify-evenly text-3xl  gap-2  w">
              <Link to="https://facebook.com" target="_blank">
                <FaFacebook />
              </Link>
              <Link to="https://twitter.com" target="_blank">
                <FaTwitter />
              </Link>
              <Link to="https://linkedin.com" target="_blank">
                <FaLinkedin />
              </Link>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                Follow Us
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                Stay connected with us on social media platforms.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            We’d love to help! Let us know how
          </h3>
          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="text"
              placeholder="Subject of Interest"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <textarea
              placeholder="How may we assist you?"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            ></textarea>
            <button className="bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-white transition-all duration-300 shadow-md">
              Send Your Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <Faq />
    </div>
  );
}
