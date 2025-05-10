import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navItems } from "../../../index.js"
import { socialLinks } from "../../../index.js";

function Footer() {
  return (
    <footer className="px-4 pt-12 pb-6 text-sm border-t ">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left - Branding */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <img src="/logo.svg" alt="Logo" className="w-5 h-5" />
          Alter
        </div>

        {/* Middle - Nav Links */}
        <ul className="hidden sm:flex space-x-8 text-gray-700 text-sm">
          {navItems.map((item, i) => (
            <li key={i} className="hover:underline">
              {item?.type === "link" ? (
                <Link to={item.path}>{item.name}</Link>
              ) : (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.path == "/#features") {
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      document
                        .getElementById("pricing")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  href={item.path}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right - Social Icons */}
        <div className="flex items-center space-x-5 text-xl text-gray-600">
          {socialLinks.map(({ icon: Icon, label, url }, idx) => (
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              key={idx}
            >
              <Link
                to={url}
                aria-label={label}
                className="hover:text-blue-600 transition"
              >
                <Icon />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom */}
      <div className="mt-6 flex  sm:flex-row justify-between items-center text-xs text-gray-500">
        <span>© 2024 Alter Template</span>
        <span>
          Made by
          <Link to="#" className="underline">
            demo
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
