const TextareaField = ({
    label,
    name,
    value,
    onChange,
    rows = 4,
    required = false,
    error,
    placeholder = "",
  }) => (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`w-full border rounded-lg p-2 ${error ? "border-red-500" : "border-gray-200"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
  export default TextareaField;
  