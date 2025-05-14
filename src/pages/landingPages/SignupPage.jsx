import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signup,
  verifyOtp,
  clearMessages,
  googleSignup,
} from "../../slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    success,
    signup: signupData,
  } = useSelector((state) => state.auth);

  const isGoogleSignupVerified = signupData?.data?.user?.isGoogleSignUp;
  const isEmailSignupVerified = signupData?.data?.user?.isEmailVerified;

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
    if (error || success) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }

    if (isGoogleSignupVerified) navigate("/dashboard");
    if (isEmailSignupVerified) navigate("/login");
  }, [
    success,
    error,
    isGoogleSignupVerified,
    isEmailSignupVerified,
    dispatch,
    navigate,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    onSuccess: ({ access_token }) => dispatch(googleSignup(access_token)),
    onError: (err) => console.error("Google login error:", err),
  });

  const handleGoogleSignup = () => googleLogin();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        {error && <Message text={error} type="error" />}
        {success && <Message text={success} type="success" />}

        {step === "form" ? (
          <SignupForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onGoogleSignup={handleGoogleSignup}
          />
        ) : (
          <OtpForm onChange={handleChange} onSubmit={handleOTPSubmit} />
        )}
      </div>
    </div>
  );
};

const Message = ({ text, type }) => (
  <div
    className={`text-sm text-center mb-2 ${
      type === "error" ? "text-red-600" : "text-green-600"
    }`}
  >
    {text}
  </div>
);

const SignupForm = ({ formData, onChange, onSubmit, onGoogleSignup }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="sm:grid sm:grid-cols-2 sm:gap-3 space-y-4 sm:space-y-0">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={onChange}
        required
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
      <select
        name="profession"
        onChange={onChange}
        value={formData.profession}
        required
        className="w-full p-2 border border-gray-300 rounded text-sm"
      >
        <option value="">Select Profession</option>
        <optgroup label="Technology">
          <option value="Software Developer">Software Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Data Scientist">Data Scientist</option>
        </optgroup>
        {/* Add more professions as needed */}
      </select>
    </div>

    <input
      type="tel"
      name="mobileNumber"
      placeholder="Phone Number"
      value={formData.mobileNumber}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded text-sm"
    />

    <input
      type="email"
      name="email"
      placeholder="Email Address"
      value={formData.email}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded text-sm"
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={onChange}
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
      onClick={onGoogleSignup}
      className="w-full border border-gray-200 hover:bg-black/5 bg-white py-2.5 px-4 rounded flex justify-center items-center gap-x-1 sm:gap-3 transition cursor-pointer"
    >
      Continue with Google <FcGoogle className="size-5 sm:size-6" />
    </button>

    <p className="text-center text-sm text-gray-700">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline">
        Login
      </Link>
    </p>
  </form>
);

const OtpForm = ({ onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <input
      type="text"
      name="otp"
      placeholder="Enter OTP"
      onChange={onChange}
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
);

export default SignupPage;
