import * as React from "react";

export default function Field({
  label,
  name,
  onChange,
  value = "",
  errors = {},
}) {
  const error = errors[name];
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <br />
      <input id={name} name={name} value={value} onChange={onChange} />
      <br />
      {error && <div className="error">{error}</div>}
    </div>
  );
}
