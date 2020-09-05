import { createModel, R } from "../lib";

const DATA = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

const person = createModel({
  data: { ...DATA },
  rules: {
    firstName: [
      R.required("Required"),
      R.max(255, "First name too long, should be :max or less characters"),
    ],
    lastName: [
      R.required("Required"),
      R.max(255, "Last name too long, should be :max or less characters"),
    ],
    email: [
      R.required("Required"),
      R.max(255, "Email too long, should be :max or less characters"),
      R.email("Invalid email"),
    ],
  },
});

describe("model data", () => {
  test("Correct initial data should pass validation", () => {
    person.set(DATA);
    const validation = person.validate();
    expect(validation.valid).toBe(true);
  });
  test("Initial data should be available on the model", () => {
    person.set(DATA);
    const data = person.get();
    expect(data).toEqual(DATA);
  });
  test("Updating a field should reflect in the model", () => {
    person.set(DATA);
    person.update({ firstName: "Jane" });
    const data = person.get();
    expect(data).toEqual({ ...DATA, firstName: "Jane" });
  });
  test("Updating data with a function callback should reflect in the model", () => {
    person.set(DATA);
    person.update((data) => {
      data.firstName = "Foo";
      data.lastName = data.firstName;
      return data;
    });
    const data = person.get();
    expect(data).toEqual({ ...DATA, firstName: "Foo", lastName: "Foo" });
  });
  test("Resetting data should reflect in the model", () => {
    person.set(DATA);
    const data = person.set({});
    expect(data).toEqual({});
  });
});
