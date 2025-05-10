import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login successful (mock)");
  };

  const handleGoogleLogin = () => {
    alert("Google login clicked (mock)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email or Number"
            onChange={handleChange}
            required
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
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-gray-200 hover:bg-black/5 bg-white py-2.5 px-4 rounded flex justify-center items-center gap-3 transition"
          >
            <FcGoogle fontSize={24} /> Continue with Google
          </button>
          <p className="text-center text-sm text-gray-700">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
