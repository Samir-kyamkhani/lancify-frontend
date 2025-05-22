import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiPhone,
  FiActivity,
  FiTag,
  FiCamera,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";

// Animations
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProfileForm = () => {
  const { user } = useSelector((state) => state?.auth);
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    companyName: "",
    number: "",
    profession: "",
    status: "",
    profileImage: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.name || "",
        email: user.email || "",
        companyName: user.companyName || "",
        number: user.mobileNumber || "",
        profession: user.profession || "",
        status: user.status || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const editHandler = () => {
    console.log("Updated Profile:", profile);
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Profile Picture */}
      <motion.div variants={itemVariant} className="relative mx-auto w-fit mb-6">
        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-lg"
          />
        ) : (
          <CgProfile className="w-32 h-32 text-gray-300 border-4 border-gray-300 rounded-full shadow" />
        )}

        <button
          onClick={() => fileInputRef.current.click()}
          type="button"
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <FiCamera className="text-gray-600 w-5 h-5 cursor-pointer" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </motion.div>

      {/* Header */}
      <motion.div
        variants={itemVariant}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <FiUser />
          Profile Information
        </h2>
        <p className="text-gray-500 mt-2">
          Keep your personal and professional info up to date.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        variants={containerVariant}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          {
            name: "fullName",
            label: "Full Name",
            icon: <FiUser />,
            type: "text",
            value: profile.fullName,
          },
          {
            name: "email",
            label: "Email",
            icon: <FiMail />,
            type: "email",
            value: profile.email,
            disabled: true,
          },
          {
            name: "number",
            label: "Phone Number",
            icon: <FiPhone />,
            type: "tel",
            value: profile.number,
          },
          {
            name: "profession",
            label: "Profession",
            icon: <FiTag />,
            type: "text",
            value: profile.profession,
            disabled: true,
          },
          {
            name: "companyName",
            label: "Company Name",
            icon: <FiBriefcase />,
            type: "text",
            value: profile.companyName,
          },
          {
            name: "status",
            label: "Status",
            icon: <FiActivity />,
            type: "text",
            value: profile.status,
            disabled: true,
          },
        ].map(({ name, label, icon, type, value, disabled }, i) => (
          <motion.div key={name} variants={itemVariant}>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2 gap-2">
              {icon}
              {label}
            </label>
            <input
              name={name}
              type={type}
              value={value}
              disabled={disabled}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
              className={`w-full px-4 py-2 rounded-xl border ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
              } focus:bg-gray-200 duration-700 shadow-sm outline-none transition`}
            />
          </motion.div>
        ))}

        {/* Save Button */}
        <motion.div variants={itemVariant} className="md:col-span-2">
          <button
            type="button"
            onClick={editHandler}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg transition shadow"
          >
            Save Profile
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default ProfileForm;
