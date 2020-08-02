import * as React from "react";
import { R, createModel } from "../lib/index";

const person = createModel({
  rules: {
    firstName: [
      R.required("This is required"),
      R.max(10, "Too long, must be :max characters or less"),
    ],
    lastName: [
      R.required("This is required"),
      R.max(20, "Too long, must be :max characters or less"),
    ],
    email: [R.required("This is required")],
  },
});

export default function Basic() {
  const [data, setData] = React.useState(person.get());
  const [errors, setErrors] = React.useState({});

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setErrors(person.validate().errors);
    },
    [setErrors]
  );

  const handleChange = React.useCallback(
    ({ target }) => {
      setData(person.update({ [target.name]: target.value }));
    },
    [setData]
  );

  const renderError = React.useCallback(
    (name) => {
      if (!errors.hasOwnProperty(name)) {
        return null;
      }
      return errors[name];
    },
    [errors]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <br />
        <input
          id="firstName"
          name="firstName"
          value={data.firstName || ""}
          onChange={handleChange}
        />
        <br />
        <div className="error">{renderError("firstName")}</div>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <br />
        <input
          id="lastName"
          name="lastName"
          value={data.lastName || ""}
          onChange={handleChange}
        />
        <br />
        <div className="error">{renderError("lastName")}</div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          name="email"
          value={data.email || ""}
          onChange={handleChange}
        />
        <br />
        <div className="error">{renderError("email")}</div>
      </div>
      <br />
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
