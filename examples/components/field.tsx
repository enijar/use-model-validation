import * as React from "react";

export default function Field({
  label,
  name,
  onChange,
  value = "",
  type = "text",
  errors = {},
  ...props
}) {
  const error = errors[name];
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <br />
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        {...props}
      />
      <br />
      {error && <div className="error">{error}</div>}
    </div>
  );
}
