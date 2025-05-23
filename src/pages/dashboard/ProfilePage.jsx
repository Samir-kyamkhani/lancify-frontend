import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Select, { components } from "react-select";

export default function ProfileForm() {
  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

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

  const editHandler = () => {
    console.log("Updated Profile:", profile);
  };

  const deleteAccountHandler = () => {
    console.log("Account Deletion Triggered");
  };

  const renderInput = (label, name, type = "text", readOnly = false) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={profile[name]}
        onChange={handleChange}
        readOnly={readOnly}
        className={`w-full border border-gray-200 bg-gray-100 focus:bg-white focus:border-gray-50 outline-none rounded p-2 ${
          readOnly ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );

  // Country options with ISO 2-letter codes for flags
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
  ];

  // Custom option component to render flag + country name
  const Option = (props) => {
    return (
      <components.Option {...props}>
        <img
          src={`https://flagcdn.com/w20/${props.data.value.toLowerCase()}.png`}
          alt={props.data.label}
          className="inline-block mr-2"
          style={{ width: "20px", height: "15px", objectFit: "cover" }}
        />
        {props.data.label}
      </components.Option>
    );
  };

  // Custom single value (selected) with flag
  const SingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        <img
          src={`https://flagcdn.com/w20/${props.data.value.toLowerCase()}.png`}
          alt={props.data.label}
          className="inline-block mr-2"
          style={{ width: "20px", height: "15px", objectFit: "cover" }}
        />
        {props.data.label}
      </components.SingleValue>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="bg-white shadow-md rounded-2xl p-6 mt-4 space-y-6">
        <h2 className="text-xl font-semibold">Personal Info</h2>

        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold overflow-hidden cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              "IMG"
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="space-y-4">
          {renderInput("Full Name", "fullName")}
          {renderInput("Email", "email", "email", true)}
          {renderInput("Company Name", "companyName")}
          {renderInput("Phone Number", "number")}
          {renderInput("Profession", "profession")}
          {renderInput("Status", "status")}

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <Select
              name="country"
              options={countryOptions}
              value={countryOptions.find((c) => c.value === profile.country)}
              onChange={handleCountryChange}
              components={{ Option, SingleValue }}
              isSearchable
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#f3f4f6", // gray-100 bg
                  borderColor: "#e5e7eb", // gray-200 border
                  boxShadow: "none", // remove blue shadow
                  "&:hover": {
                    borderColor: "#d1d5db", // gray-300 on hover if you want
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          <button
            onClick={editHandler}
            className="bg-blue-500 font-medium py-2 px-4 rounded-lg w-full hover:bg-blue-600 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Set a password</h2>
        {renderInput("New Password", "newPassword", "password")}
        {renderInput("Confirm Password", "confirmPassword", "password")}
        <button
          onClick={editHandler}
          className="bg-blue-500 font-medium py-2 px-4 rounded-lg w-full hover:bg-blue-600 text-white"
        >
          Save Password
        </button>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
        <h2 className="text-xl text-red-600 font-semibold">
          Delete your account
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Your account, along with all associated data, content, credit card,
          and payout information, will be permanently deleted and cannot be
          restored.
        </p>
        <button
          onClick={deleteAccountHandler}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}
