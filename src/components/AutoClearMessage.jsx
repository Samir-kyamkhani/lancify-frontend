import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const allowedSuccessMessages = [
  "OTP sent to your email.",
  "OTP has been sent to your email.",
  "OTP resent successfully.",
];

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const AutoClearMessage = ({ duration = 5000 }) => {
  const dispatch = useDispatch();

  // Select individual pieces of state to avoid unnecessary re-renders
  const authError = useSelector((state) => state.auth.error);
  const authSuccess = useSelector((state) => state.auth.success);
  const clientError = useSelector((state) => state.clientData.error);
  const clientSuccess = useSelector((state) => state.clientData.success);

  // Automatically clear messages after duration if they aren't allowed success messages
  useEffect(() => {
    const shouldClearAuth =
      authError || (authSuccess && !allowedSuccessMessages.includes(authSuccess));
    const shouldClearClient =
      clientError || (clientSuccess && !allowedSuccessMessages.includes(clientSuccess));

    if (!shouldClearAuth && !shouldClearClient) return;

    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, duration);

    return () => clearTimeout(timer);
  }, [authError, authSuccess, clientError, clientSuccess, dispatch, duration]);

  return (
    <div className="mb-3">
      <AnimatePresence>
        {authError && (
          <motion.div
            key="authError"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="bg-red-100 text-xs sm:text-sm text-red-700 px-4 py-2 rounded shadow mb-2"
          >
            {authError}
          </motion.div>
        )}

        {authSuccess && (
          <motion.div
            key="authSuccess"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="bg-green-100 text-xs sm:text-sm text-green-700 px-4 py-2 rounded shadow mb-2"
          >
            {authSuccess}
          </motion.div>
        )}

        {clientError && (
          <motion.div
            key="clientError"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="bg-red-100 text-xs sm:text-sm text-red-700 px-4 py-2 rounded shadow mb-2"
          >
            {clientError}
          </motion.div>
        )}

        {clientSuccess && (
          <motion.div
            key="clientSuccess"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="bg-green-100 text-xs sm:text-sm text-green-700 px-4 py-2 rounded shadow"
          >
            {clientSuccess}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoClearMessage;
