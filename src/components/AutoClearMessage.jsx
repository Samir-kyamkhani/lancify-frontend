import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const AutoClearMessage = ({ duration = 5000 }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error || (success && success !== "Please verify OTP.")) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch, duration]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="mb-3">
      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="bg-red-100 text-xs sm:text-sm text-red-700 px-4 py-2 rounded shadow mb-2"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            key="success"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="bg-green-100 text-xs sm:text-sm text-green-700 px-4 py-2 rounded shadow"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoClearMessage;
