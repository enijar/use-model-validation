import * as React from "react";
import { R, createModel } from "../../lib";
import Field from "../components/field";

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

  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="First Name"
        name="firstName"
        value={data.firstName}
        errors={errors}
        onChange={handleChange}
      />
      <Field
        label="Last Name"
        name="lastName"
        value={data.lastName}
        errors={errors}
        onChange={handleChange}
      />
      <Field
        label="Email"
        name="email"
        value={data.email}
        errors={errors}
        onChange={handleChange}
      />
      <br />
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
