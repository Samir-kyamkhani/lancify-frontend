import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const AutoClearMessage = ({ duration = 5000 }) => {
  const dispatch = useDispatch();
  const { auth, clientData } = useSelector((state) => ({
    auth: state.auth,
    clientData: state.clientData,
  }));

  const authError = auth.error;
  const authSuccess = auth.success;
  const clientError = clientData.error;
  const clientSuccess = clientData.success;

  useEffect(() => {
    const allowedSuccessMessages = [
      "OTP sent to your email.",
      "OTP has been sent to your email.",
      "OTP resent successfully.",
    ];

    if (
      !authError &&
      (!authSuccess || allowedSuccessMessages.includes(authSuccess))
    ) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, duration);

    return () => clearTimeout(timer);
  }, [authError, authSuccess, dispatch, duration]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="mb-3">
      <AnimatePresence>
        {authError && (
          <motion.div
            key="error"
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
            key="success"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="bg-green-100 text-xs sm:text-sm text-green-700 px-4 py-2 rounded shadow"
          >
            {authSuccess}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoClearMessage;
