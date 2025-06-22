import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { CgClose, CgProfile } from "react-icons/cg";
import { navItems } from "../../../index";
import { useSelector } from "react-redux";
import { FaArtstation } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  const { user } = useSelector((state) => state?.auth);

  return (
    <header
      className={`relative z-50 top-2 w-full ${
        isOpen ? "rounded-tl-xl rounded-tr-xl" : "rounded-xl"
      } ${
        scrolled ? "sticky top-2 bg-white duration-700 shadow-2xl" : ""
      } px-4 sm:px-8 py-3 flex items-center justify-between`}
    >
      {/* Logo */}
      <div className="w-[100px] flex gap-3 items-center justify-center ">
        <div><FaArtstation className="text-2xl mt-1"/></div>
        <Link to="/">
          {/* <img
            src="https://framerusercontent.com/images/on7xUpJ1SM94eAeiyf04v5F4rjQ.png"
            alt="Logo"
          /> */}
          

          <h1 className="text-3xl font-bold capitalize">Lancify</h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={`hidden lg:flex items-center  ${
          user ? "space-x-6" : "space-x-16"
        }`}
      >
        <ul className="flex space-x-2">
          {navItems.map((item, i) => (
            <li
              key={i}
              className="hover:bg-blue-200 px-3 py-1 rounded transition duration-300"
            >
              {item.type === "link" ? (
                <Link to={item.path}>{item.name}</Link>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) =>
                    handleAnchorClick(
                      e,
                      item.path.includes("features") ? "features" : "pricing"
                    )
                  }
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          {user ? (
            <Link to={"/dashboard"}>
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || "User Avatar"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <CgProfile className="w-8 h-8 text-gray-600" />
              )}
            </Link>
          ) : (
            <div className="space-x-4">
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-white/70 border border-gray-300 text-black py-2 px-4 rounded-lg font-semibold shadow-md transition duration-300"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <motion.div
        className="lg:hidden cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 1 }}
        animate={{
          scale: isOpen ? 1.2 : 1,
          rotate: isOpen ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {isOpen ? (
          <CgClose className="text-3xl" />
        ) : (
          <BiMenuAltRight className="text-3xl" />
        )}
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex justify-center items-start pt-20 h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-11/12 max-w-sm mx-auto p-6 space-y-4 "
              initial={{ y: "-10%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "10%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {navItems.map((item, i) => (
                <div key={i}>
                  {item.type === "link" ? (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-medium py-2  border-b p-2 border-gray-200  px-3 text-center"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      onClick={(e) =>
                        handleAnchorClick(
                          e,
                          item.path.includes("features")
                            ? "features"
                            : "pricing"
                        )
                      }
                      className="block text-lg font-medium py-2  border-b p-2 border-gray-200 px-3 text-center"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-2 flex flex-col space-y-3">
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white text-center py-2 rounded-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-white border border-black text-center py-2 rounded-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
