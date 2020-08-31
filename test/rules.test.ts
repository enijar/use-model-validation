import { createModel, R } from "../lib";

const VALID_DATA = {
  field1: "1",
  field2: 5,
  field3: 5,
};

const example = createModel({
  rules: {
    field1: [R.required("Required")],
    field2: [R.min(5, "Too small, must be :min or more")],
    field3: [R.max(5, "Too large, must be :max or less")],
  },
});

describe("required", () => {
  test("empty value should not pass validation", () => {
    example.set({ ...VALID_DATA, field1: "" });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("non-empty value should pass validation", () => {
    example.set({ ...VALID_DATA, field1: "1" });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid value should show custom error message", () => {
    example.set({ ...VALID_DATA, field1: "" });
    const validation = example.validate();
    expect(validation.errors.field1).toBe("Required");
  });
  test("valid value should not show custom error message", () => {
    example.set({ ...VALID_DATA, field1: "1" });
    const validation = example.validate();
    expect(validation.errors.field1).toBe(undefined);
  });
});

describe("min", () => {
  test("value less than min should not pass validation", () => {
    example.set({ ...VALID_DATA, field2: VALID_DATA.field2 - 1 });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("value equal to min should pass validation", () => {
    example.set({ ...VALID_DATA, field2: VALID_DATA.field2 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("value greater than min should pass validation", () => {
    example.set({ ...VALID_DATA, field2: VALID_DATA.field2 + 1 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid value should show custom error message", () => {
    example.set({ ...VALID_DATA, field2: VALID_DATA.field2 - 1 });
    const validation = example.validate();
    expect(validation.errors.field2).toBe(
      `Too small, must be ${VALID_DATA.field2} or more`
    );
  });
  test("valid value should not show custom error message", () => {
    example.set({ ...VALID_DATA, field2: VALID_DATA.field2 });
    const validation = example.validate();
    expect(validation.errors.field2).toBe(undefined);
  });
});

describe("max", () => {
  test("value more than max should not pass validation", () => {
    example.set({ ...VALID_DATA, field3: VALID_DATA.field3 + 1 });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("value equal to max should pass validation", () => {
    example.set({ ...VALID_DATA, field3: VALID_DATA.field3 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("value less than max should pass validation", () => {
    example.set({ ...VALID_DATA, field3: VALID_DATA.field3 - 1 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid value should show custom error message", () => {
    example.set({ ...VALID_DATA, field3: VALID_DATA.field3 + 1 });
    const validation = example.validate();
    expect(validation.errors.field3).toBe(
      `Too large, must be ${VALID_DATA.field3} or less`
    );
  });
  test("valid value should not show custom error message", () => {
    example.set({ ...VALID_DATA, field3: VALID_DATA.field3 });
    const validation = example.validate();
    expect(validation.errors.field3).toBe(undefined);
  });
});
