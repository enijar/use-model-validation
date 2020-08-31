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
    <div style={{ marginBottom: "0.5em" }}>
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
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
