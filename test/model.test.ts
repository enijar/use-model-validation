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

describe("model events", () => {
  test("set event is emitted when model.set is called", () => {
    const fn = jest.fn();
    person.on("set", fn);
    person.set({ firstName: "Test" });
    expect(fn.mock.calls.length).toBe(1);
  });
  test("set event is not emitted when model.set is not called", () => {
    const fn = jest.fn();
    person.on("set", fn);
    expect(fn.mock.calls.length).toBe(0);
  });
  test("update event is emitted when model.update is called", () => {
    const fn = jest.fn();
    person.on("update", fn);
    person.update({ firstName: "Test" });
    expect(fn.mock.calls.length).toBe(1);
  });
  test("update event is not emitted when model.update is not called", () => {
    const fn = jest.fn();
    person.on("update", fn);
    expect(fn.mock.calls.length).toBe(0);
  });
  test("validate event is emitted when model.validate is called", () => {
    const fn = jest.fn();
    person.on("validate", fn);
    person.validate();
    expect(fn.mock.calls.length).toBe(1);
  });
  test("validate event is not emitted when model.validate is not called", () => {
    const fn = jest.fn();
    person.on("validate", fn);
    expect(fn.mock.calls.length).toBe(0);
  });
  test("events are not called when off is called", () => {
    const fn = jest.fn();
    person.on("set", fn);
    person.off("set", fn);
    person.set({ firstName: "Test" });
    expect(fn.mock.calls.length).toBe(0);
  });
});
