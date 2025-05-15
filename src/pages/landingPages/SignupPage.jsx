import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, verifyOtp, googleSignup } from "../../slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { IoIosArrowBack } from "react-icons/io";
import AutoClearMessage from "../../components/AutoClearMessage";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Only grab what we actually use from the auth slice
  const { isLoading, success, user:userData } = useSelector((state) => state.auth);
  const user = userData?.data?.user;

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    mobileNumber: "",
    password: "",
    otp: "",
  });

  useEffect(() => {
    if (user?.isGoogleSignUp) navigate("/dashboard");
    if (success === "OTP Verified. Account created!") navigate("/login");
  }, [user?.isGoogleSignUp, success, navigate]);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email && !formData.mobileNumber) {
      alert("Please enter either email or phone number.");
      return;
    }

    await dispatch(signup(formData));
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp(formData.email, formData.otp));
  };

  const googleLogin = useGoogleLogin({
    onSuccess: ({ access_token }) => dispatch(googleSignup(access_token)),
    onError: (err) => console.error("Google login error:", err),
  });

  const isOtpStep = success === "Please verify OTP.";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="relative">
          <Link
            to={isOtpStep ? "#" : "/"}
            className="absolute cursor-pointer bg-blue-100 sm:top-1 p-2 rounded-lg left-0"
          >
            <IoIosArrowBack />
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">
            {isOtpStep ? "Verify OTP" : "Sign Up"}
          </h2>
        </div>

        <AutoClearMessage />

        <form
          onSubmit={isOtpStep ? handleOTPSubmit : handleSubmit}
          className="space-y-4"
        >
          <div className="sm:grid sm:grid-cols-2 sm:gap-3 space-y-4 sm:space-y-0">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isOtpStep}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            <select
              name="profession"
              onChange={handleChange}
              value={formData.profession}
              required
              disabled={isOtpStep}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="">Select Profession</option>
              <optgroup label="Technology">
                <option value="Software Developer">Software Developer</option>
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
            disabled={isOtpStep}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled={isOtpStep}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isOtpStep}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />

          {isOtpStep && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 px-4 rounded transition cursor-pointer text-white ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading
              ? isOtpStep
                ? "Verifying..."
                : "Submitting..."
              : isOtpStep
              ? "Verify OTP"
              : "Sign Up"}
          </button>

          {!isOtpStep && (
            <button
              type="button"
              onClick={googleLogin}
              disabled={isLoading}
              className="w-full border border-gray-200 hover:bg-black/5 bg-white py-2.5 px-4 rounded flex justify-center items-center gap-x-1 sm:gap-3 transition cursor-pointer"
            >
              Continue with Google <FcGoogle className="size-5 sm:size-6" />
            </button>
          )}

          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
