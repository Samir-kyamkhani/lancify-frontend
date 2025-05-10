import React, { useState } from "react";
import { FiUser, FiMail, FiBriefcase, FiFileText } from "react-icons/fi";

const ProfileForm = () => {
  const [fullName, setFullName] = useState("Demo User");
  const [email] = useState("demo@gmail.com");
  const [companyName, setCompanyName] = useState("");
  const [bio, setBio] = useState("");

  return (
    <div className=" bg-white shadow-md rounded-lg p-3 sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
        <FiUser className="text-gray-700" />
        Profile
      </h2>
      <p className="text-gray-500 mb-6">Manage your personal and company information.</p>

      <form className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2 ml-1">
            <FiUser />
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2 ml-1">
            <FiMail />
            Email Address
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border border-gray-300 p-2 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2 ml-1">
            <FiBriefcase />
            Company Name (Optional)
          </label>
          <input
            type="text"
            placeholder="Your Agency Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Short Bio */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2 ml-1">
            <FiFileText />
            Short Bio / Description
          </label>
          <textarea
            placeholder="Tell us a bit about yourself or your agency."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            rows="4"
          />
        </div>

        {/* Button */}
        <button
          type="button"
          disabled
          className="bg-blue-200 text-white px-4 py-2 rounded-md cursor-not-allowed"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
