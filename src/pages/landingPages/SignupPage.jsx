import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signup,
  googleSignup,
  clearMessages,
  resendOtp,
} from "../../slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import AutoClearMessage from "../../components/AutoClearMessage";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import AuthSidebar from "../../components/landingComponents/AuthSidebar";
const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, success, user } = useSelector((state) => state.auth);

  const isOtpStep = [
    "OTP resent successfully.",
    "OTP sent to your email.",
  ].includes(success);

  useEffect(() => {
    if (user?.isGoogleSignUp === true) {
      navigate("/dashboard");
    } else if (success === "Success") {
      navigate("/login");
    }
  }, [user, success, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    mobileNumber: "",
    password: "",
    otp: "",
  });

  const [resendCooldown, setResendCooldown] = useState(0);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email && !formData.mobileNumber) {
      alert("Please enter either email or phone number.");
      return;
    }
    dispatch(signup(formData));
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      console.error("Missing Google ID token", credentialResponse);
      return;
    }
    dispatch(googleSignup(idToken));
  };

  const handleGoogleLoginError = () => {
    alert("Google login failed. Please try again.");
  };

  const handleResendOtp = () => {
    if (!formData.email) return alert("Missing email address.");
    dispatch(resendOtp(formData.email));
    setResendCooldown(60);
  };

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  return (
    <div className="flex flex-col justify-center items-center space-y-8 lg:flex-row lg:justify-evenly p-8">
      {/* Left Side */}
      <AuthSidebar />

      {/* Right Side (Signup Form) */}
      <div className="flex items-center justify-center w-fit">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-[#FFFFFF] rounded-3xl shadow-2xl px-8 py-10"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isOtpStep ? "Verify OTP" : "Welcome to Lancify"}
          </h2>
          {!isOtpStep && (
            <p className="text-center text-sm text-gray-500 mt-1">
              Log in to manage your workflow like a pro.
            </p>
          )}

          <AutoClearMessage />

          <form
            onSubmit={isOtpStep ? handleOTPSubmit : handleSubmit}
            className="flex flex-col gap-4"
          >
            {!isOtpStep && (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    name="profession"
                    onChange={handleChange}
                    value={formData.profession}
                    required
                    disabled={isLoading}
                    className="bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Profession</option>
                    <optgroup label="Technology">
                      <option value="Software Developer">
                        Software Developer
                      </option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="Data Scientist">Data Scientist</option>
                    </optgroup>
                  </select>
                </div>

                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Phone Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}

            {isOtpStep && (
              <>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-center text-sm">
                  Didn't receive the OTP?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || isLoading}
                    className={`font-medium hover:underline text-blue-600 ${
                      resendCooldown > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {resendCooldown > 0
                      ? `Resend in ${resendCooldown}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
            >
              {isLoading
                ? isOtpStep
                  ? "Verifying..."
                  : "Submitting..."
                : isOtpStep
                ? "Verify OTP"
                : "Generate OTP"}
            </motion.button>

            {!isOtpStep && (
              <div className="pt-2">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap
                  width="100%"
                  shape="pill"
                  text="continue_with"
                />
              </div>
            )}

            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
