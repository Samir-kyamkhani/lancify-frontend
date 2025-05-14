import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signup,
  verifyOtp,
  clearMessages,
  googleSignup,
} from "../../slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignupPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, success, otpVerified } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    mobileNumber: "",
    password: "",
    otp: "",
  });

  const [step, setStep] = useState("form");

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }
    if (otpVerified) {
      navigate("/login");
    }
  }, [success, error, dispatch, otpVerified, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email && !formData.mobileNumber) {
      alert("Please enter either email or phone number.");
      return;
    }
    dispatch(signup(formData)).then(() => setStep("otp"));
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp(formData.email, formData.otp));
  };

  const googleLogin = useGoogleLogin({
    flow: "popup", // Use the popup flow to avoid window interaction issues
    scope: "openid profile email", // Ensure the right scopes for ID token
    onSuccess: async (tokenResponse) => {
      console.log("tokenResponse", tokenResponse);

      try {
        // Check if ID token exists
        const idToken = tokenResponse?.id_token;
        if (!idToken) {
          throw new Error("No ID token received.");
        }

        // Decode the ID token
        const decoded = jwtDecode(idToken);
        console.log("decoded", decoded);

        // Proceed with the signup logic
        dispatch(
          googleSignup({
            googleId: idToken,
            name: decoded.name,
            profession: "", // Optional field
          })
        );
      } catch (err) {
        console.error("Google login error:", err.message || err);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  const handleGoogleSignup = () => {
    googleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        {error && (
          <div className="text-red-600 text-sm text-center mb-2">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center mb-2">
            {success}
          </div>
        )}

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="sm:grid sm:grid-cols-2 sm:gap-3 space-y-4 sm:space-y-0">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
              <select
                name="profession"
                onChange={handleChange}
                required
                value={formData.profession}
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
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full border border-gray-200 hover:bg-black/5 bg-white py-2.5 px-4 rounded flex justify-center items-center gap-3 transition"
            >
              <FcGoogle fontSize={24} /> Continue with Google
            </button>

            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded hover:bg-blue-700 transition"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
