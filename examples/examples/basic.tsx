import * as React from "react";
import { createModel, R } from "../../lib";
import Field from "../components/field";

const person = createModel({
  data: {
    rating: 0,
  },
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
    dob: [
      R.required("This is required"),
      R.min(() => Date.now() - 1000 * 60 * 60 * 24 * 365 * 18),
    ],
    rating: [R.between([10, 100])],
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
      const name = target.name;
      let value = target.value;
      if (name === "date") {
        value = new Date(value);
      }
      setData(person.update({ [name]: value }));
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
      <Field
        label="Date of Birth"
        name="dob"
        value={data.dob}
        type="dob"
        errors={errors}
        onChange={handleChange}
      />
      <Field
        label="Rating"
        name="rating"
        min={0}
        max={5}
        steps={1}
        value={data.rating}
        type="range"
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
