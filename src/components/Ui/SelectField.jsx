const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  placeholder = "Select an option",
}) => (
  <div className="w-full">
    <label htmlFor={name} className="block mb-1 font-medium">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full border rounded-lg p-2 ${
        error ? "border-red-500" : "border-gray-200"
      }`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
export default SelectField;
