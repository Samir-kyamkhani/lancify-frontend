import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    profession: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const [step, setStep] = useState("form");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email && !formData.phone) {
      alert("Please enter either email or phone number.");
      return;
    }
    setStep("otp");
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    alert("OTP Verified. Account created!");
  };

  const handleGoogleLogin = () => {
    alert("Google login clicked (mock)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="sm:grid sm:grid-cols-2 sm:gap-3 space-y-4 sm:space-y-0">
              <input
                type="text"
                name="fullName"
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
                <optgroup label="Healthcare">
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                </optgroup>
                <optgroup label="Education">
                  <option value="Teacher">Teacher</option>
                  <option value="Professor">Professor</option>
                  <option value="Librarian">Librarian</option>
                </optgroup>
                <optgroup label="Business">
                  <option value="Accountant">Accountant</option>
                  <option value="Manager">Manager</option>
                  <option value="HR Specialist">HR Specialist</option>
                </optgroup>
                <optgroup label="Freelance">
                  <option value="Freelancer">Freelancer</option>
                </optgroup>
              </select>
            </div>

            <input
              type="tel"
              name="phone"
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
              onClick={handleGoogleLogin}
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
