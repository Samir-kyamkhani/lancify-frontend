const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  error,
  placeholder = "",
  readOnly = false,
}) => (
  <div
    className={`w-full ${
      type == "checkbox" &&
      "flex flex-reverse justify-start items-center space-x-5 cursor-pointer"
    }`}
  >
    <label htmlFor={name} className="block mb-1 font-medium w-fit">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`border rounded-lg p-2 w-full  ${
        error ? "border-red-500" : "border-gray-200"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
export default InputField;
