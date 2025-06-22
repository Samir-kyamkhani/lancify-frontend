import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin } from "../../slices/authSlice";
import AutoClearMessage from "../../components/AutoClearMessage";
import { IoIosArrowBack } from "react-icons/io";
import AuthSidebar from "../../components/landingComponents/AuthSidebar";
import { motion } from "framer-motion";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user?.isEmailVerified || user?.isGoogleSignUp || user?.role === "user" || user?.role === "member") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password)
      return alert("Please fill in all fields");
    dispatch(login(formData));
  };

  const handleGoogleLoginSuccess = ({ credential }) => {
    if (credential) dispatch(googleLogin(credential));
  };

  const handleGoogleLoginError = () => {
    alert("Google login failed. Please try again.");
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-8 lg:flex-row lg:justify-evenly p-8 py-16">
      <AuthSidebar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md bg-[#FFFFFF] rounded-xl shadow-2xl px-8 py-10"
      >

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Log in to manage your workflow like a pro.
        </p>

        <AutoClearMessage />

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={formData.email}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-400 text-sm">OR</div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
            shape="pill"
            text="continue_with"
            width="100%"
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
