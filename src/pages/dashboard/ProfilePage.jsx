import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Select, { components } from "react-select";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaTrash, FaCamera, FaEye, FaEyeSlash, FaCheck, FaEdit, FaBell, FaGlobe } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";

export default function ProfileForm() {
  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    companyName: "",
    number: "",
    profession: "",
    status: "",
    country: "",
    profileImage: "",
    newPassword: "",
    confirmPassword: "",
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
        country: user.country || "US",
        profileImage: user.profileImage || "",
        newPassword: "",
        confirmPassword: "",
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

  const handleCountryChange = (selectedOption) => {
    setProfile((prev) => ({ ...prev, country: selectedOption.value }));
  };

  const editHandler = async () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Updated Profile:", profile);
      setIsLoading(false);
    }, 1500);
  };

  const deleteAccountHandler = () => {
    console.log("Account Deletion Triggered");
  };

  const renderInput = (label, name, type = "text", readOnly = false, icon = null, placeholder = "") => {
    const isPassword = type === "password";
    const showPassword = name === "newPassword" ? showNewPassword : showConfirmPassword;
    const togglePassword = name === "newPassword" ? setShowNewPassword : setShowConfirmPassword;

    return (
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10">
              {icon}
            </div>
          )}
          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            name={name}
            value={profile[name]}
            onChange={handleChange}
            readOnly={readOnly}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            className={`
              w-full border-2 transition-all duration-300 rounded-lg p-4 text-sm bg-white
              ${icon ? 'pl-12' : ''}
              ${isPassword ? 'pr-12' : ''}
              ${readOnly 
                ? "bg-gray-50 border-gray-200 cursor-not-allowed text-gray-500" 
                : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10"
              }
              focus:outline-none placeholder-gray-400
            `}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => togglePassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      </div>
    );
  };

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "IN", label: "India" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "BR", label: "Brazil" },
    { value: "CN", label: "China" },
    { value: "IT", label: "Italy" },
    { value: "ES", label: "Spain" },
  ];

  const Option = (props) => (
    <components.Option {...props}>
      <div className="flex items-center py-2">
        <img
          src={`https://flagcdn.com/w20/${props.data.value.toLowerCase()}.png`}
          alt={props.data.label}
          className="w-6 h-4 mr-3 object-cover rounded-sm shadow-sm"
        />
        <span className="text-sm font-medium">{props.data.label}</span>
      </div>
    </components.Option>
  );

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      <div className="flex items-center">
        <img
          src={`https://flagcdn.com/w20/${props.data.value.toLowerCase()}.png`}
          alt={props.data.label}
          className="w-6 h-4 mr-3 object-cover rounded-sm shadow-sm"
        />
        <span className="text-sm font-medium">{props.data.label}</span>
      </div>
    </components.SingleValue>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'security', label: 'Security', icon: FaShield },
    { id: 'preferences', label: 'Preferences', icon: FaBell },
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-3">
        <div>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <p className="text-xs text-gray-500">Manage your account</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="max-w-7xl px-4 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-xl shadow-gray-900/5 border border-gray-200/50 sticky top-24">
              {/* Profile Summary */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div
                    className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profile.profileImage ? (
                      <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="text-2xl text-gray-400" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <FaCamera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                    <FaEdit className="text-white text-xs" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{profile.fullName || "Your Name"}</h3>
                <p className="text-sm text-gray-500">{profile.profession || "Add your profession"}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`text-sm ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="font-medium text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Account Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Profile Complete</span>
                    <span className="font-medium text-blue-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 lg:mt-0 lg:col-span-9">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div className="bg-white/80 backdrop-blur-xl rounded-xl p-8 shadow-xl shadow-gray-900/5 border border-gray-200/50">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                        <p className="text-gray-600 mt-1">Update your personal details and information.</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FaUser className="text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {renderInput("Full Name", "fullName", "text", false, <FaUser />, "Enter your full name")}
                      {renderInput("Email Address", "email", "email", true, null, "Your email address")}
                      {renderInput("Company Name", "companyName", "text", false, null, "Your company name")}
                      {renderInput("Phone Number", "number", "tel", false, null, "+1 (555) 000-0000")}
                      {renderInput("Profession", "profession", "text", false, null, "Software Engineer")}
                      {renderInput("Status", "status", "text", false, null, "Available for work")}
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <Select
                        name="country"
                        options={countryOptions}
                        value={countryOptions.find((c) => c.value === profile.country)}
                        onChange={handleCountryChange}
                        components={{ Option, SingleValue }}
                        isSearchable
                        placeholder="Select your country"
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            backgroundColor: "white",
                            borderColor: state.isFocused ? "#3B82F6" : "#E5E7EB",
                            borderWidth: "2px",
                            borderRadius: "16px",
                            padding: "8px",
                            boxShadow: state.isFocused ? "0 10px 25px -5px rgba(59, 130, 246, 0.1)" : "none",
                            "&:hover": { borderColor: "#D1D5DB" },
                          }),
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                            borderRadius: "16px",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            border: "1px solid #E5E7EB",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? "#3B82F6" : state.isFocused ? "#F8FAFC" : "white",
                            color: state.isSelected ? "white" : "#374151",
                            cursor: "pointer",
                            borderRadius: "8px",
                            margin: "4px 8px",
                            width: "calc(100% - 16px)",
                          }),
                        }}
                      />
                    </div>

                    <button
                      onClick={editHandler}
                      disabled={isLoading}
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <FaCheck />
                      )}
                      {isLoading ? "Saving Changes..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8">
                  {/* Password Settings */}
                  <div className="bg-white/80 backdrop-blur-xl rounded-xl p-8 shadow-xl shadow-gray-900/5 border border-gray-200/50">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Password & Security</h2>
                        <p className="text-gray-600 mt-1">Keep your account secure with a strong password.</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <FaLock className="text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {renderInput("New Password", "newPassword", "password", false, <FaLock />, "Enter new password")}
                      {renderInput("Confirm Password", "confirmPassword", "password", false, <FaLock />, "Confirm new password")}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                      <h4 className="font-semibold text-blue-900 mb-2">Password Requirements</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Include at least one number</li>
                        <li>• Include at least one special character</li>
                      </ul>
                    </div>

                    <button
                      onClick={editHandler}
                      disabled={isLoading}
                      className="w-full md:w-auto bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <FaShield />
                      )}
                      {isLoading ? "Updating Password..." : "Update Password"}
                    </button>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-white/80 backdrop-blur-xl rounded-xl p-8 shadow-xl shadow-gray-900/5 border border-red-200/50">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
                        <p className="text-gray-600 mt-1">Irreversible and destructive actions.</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <FaTrash className="text-white" />
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Delete Account</h3>
                      <p className="text-sm text-red-700 leading-relaxed mb-4">
                        Once you delete your account, there is no going back. Please be certain. All your data, 
                        including profile information, settings, and associated content will be permanently removed.
                      </p>
                      <ul className="text-xs text-red-600 space-y-1">
                        <li>• All personal data will be permanently deleted</li>
                        <li>• You will lose access to all services immediately</li>
                        <li>• This action cannot be undone</li>
                      </ul>
                    </div>

                    <button
                      onClick={deleteAccountHandler}
                      className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-red-500/25 flex items-center gap-3"
                    >
                      <FaTrash />
                      Delete My Account
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="bg-white/80 backdrop-blur-xl rounded-xl p-8 shadow-xl shadow-gray-900/5 border border-gray-200/50">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
                      <p className="text-gray-600 mt-1">Customize your experience and notifications.</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <FaBell className="text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center py-12">
                    <FaBell className="text-4xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-500">Notification preferences and customization options will be available here.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}