import { createModel, R } from "../lib";

const VALID_DATA = {
  field1: "1",
  field2: 5,
  field3: 6,
  field4: 7,
  field5: "1990-01-28",
  field6: "0",
  field7: "12345",
  field8: "username@example.com",
  field9: "07123456789",
  field10: "(222) 212-3456",
  field11: "SW1A 2AA",
  field12: "37188",
};

const example = createModel({
  rules: {
    field1: [R.required("Required")],
    field2: [R.min(5, "Too small, must be :min or more")],
    field3: [R.max(6, "Too large, must be :max or less")],
    field4: [R.between([7, 9], "Wrong range, must be between :min and :max")],
    field5: [
      R.test((data) => {
        const ts18Years = 1000 * 60 * 60 * 24 * 365 * 18;
        return new Date(data.field5).getTime() <= Date.now() - ts18Years;
      }, "You must be 18 or older"),
    ],
    field6: [R.format(/^[0-9]$/, "Must be a single digit number")],
    field7: [
      R.required("Required"),
      R.max(5, "Too large, must be :max or less"),
    ],
    field8: [R.email("Invalid email")],
    field9: [R.mobileUK("Invalid mobile number")],
    field10: [R.mobileUS("Invalid mobile number")],
    field11: [R.postcodeUK("Invalid postcode")],
    field12: [R.postcodeUS("Invalid postcode")],
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
  test("value more than min should pass validation", () => {
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

describe("between", () => {
  test("value less than min should not pass validation", () => {
    example.set({ ...VALID_DATA, field4: VALID_DATA.field4 - 1 });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("value more than max should not pass validation", () => {
    example.set({ ...VALID_DATA, field4: VALID_DATA.field4 + 3 });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("value equal to min should pass validation", () => {
    example.set({ ...VALID_DATA, field4: VALID_DATA.field4 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("value equal to max should pass validation", () => {
    example.set({ ...VALID_DATA, field4: VALID_DATA.field4 + 2 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("value between max and max should pass validation", () => {
    example.set({ ...VALID_DATA, field4: VALID_DATA.field4 + 1 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid value should show custom error message", () => {
    example.set({ ...VALID_DATA, field4: VALID_DATA.field4 + 3 });
    const validation = example.validate();
    expect(validation.errors.field4).toBe(
      `Wrong range, must be between 7 and 9`
    );
  });
  test("valid value should not show custom error message", () => {
    example.set({ ...VALID_DATA, field4: VALID_DATA.field4 });
    const validation = example.validate();
    expect(validation.errors.field4).toBe(undefined);
  });
});

describe("test", () => {
  const CURRENT_YEAR = new Date().getFullYear();
  const CURRENT_MONTH = String(new Date().getMonth() + 1).padStart(2, "0");
  const CURRENT_DATE = String(new Date().getDate()).padStart(2, "0");
  test("failing test function should not pass validation", () => {
    example.set({ ...VALID_DATA, field5: `${CURRENT_YEAR}-01-28` });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("passing test function should pass validation", () => {
    example.set({
      ...VALID_DATA,
      field5: `${CURRENT_YEAR - 18}-${CURRENT_MONTH}-${CURRENT_DATE}`,
    });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("failing test function should show custom error message", () => {
    example.set({
      ...VALID_DATA,
      field5: `${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}`,
    });
    const validation = example.validate();
    expect(validation.errors.field5).toBe("You must be 18 or older");
  });
  test("passing test function should not show custom error message", () => {
    example.set({
      ...VALID_DATA,
      field5: `${CURRENT_YEAR - 18}-${CURRENT_MONTH}-${CURRENT_DATE}`,
    });
    const validation = example.validate();
    expect(validation.errors.field5).toBe(undefined);
  });
});

describe("format", () => {
  test("value not matching format should not pass validation", () => {
    example.set({ ...VALID_DATA, field6: `${VALID_DATA.field6}1` });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("value matching format should pass validation", () => {
    example.set({ ...VALID_DATA, field6: VALID_DATA.field6 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("value not matching format should show custom error message", () => {
    example.set({ ...VALID_DATA, field6: `${VALID_DATA.field6}1` });
    const validation = example.validate();
    expect(validation.errors.field6).toBe("Must be a single digit number");
  });
  test("value matching format should not show custom error message", () => {
    example.set({ ...VALID_DATA, field6: VALID_DATA.field6 });
    const validation = example.validate();
    expect(validation.errors.field6).toBe(undefined);
  });
});

describe("email", () => {
  test("invalid email should not pass validation", () => {
    example.set({ ...VALID_DATA, field8: "invalid@email" });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("valid email should pass validation", () => {
    example.set({ ...VALID_DATA, field8: VALID_DATA.field8 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid email should show custom error message", () => {
    example.set({ ...VALID_DATA, field8: "invalid@email" });
    const validation = example.validate();
    expect(validation.errors.field8).toBe("Invalid email");
  });
  test("valid email should not show custom error message", () => {
    example.set({ ...VALID_DATA, field8: VALID_DATA.field8 });
    const validation = example.validate();
    expect(validation.errors.field8).toBe(undefined);
  });
});

describe("mobileUK", () => {
  test("invalid UK mobile number should not pass validation", () => {
    example.set({ ...VALID_DATA, field9: `9${VALID_DATA.field9}` });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("valid UK mobile number should pass validation", () => {
    example.set({ ...VALID_DATA, field9: VALID_DATA.field9 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid UK mobile number should show custom error message", () => {
    example.set({ ...VALID_DATA, field9: `9${VALID_DATA.field9}` });
    const validation = example.validate();
    expect(validation.errors.field9).toBe("Invalid mobile number");
  });
  test("valid UK mobile number should not show custom error message", () => {
    example.set({ ...VALID_DATA, field9: VALID_DATA.field9 });
    const validation = example.validate();
    expect(validation.errors.field9).toBe(undefined);
  });
});

describe("mobileUS", () => {
  test("invalid US mobile number should not pass validation", () => {
    example.set({ ...VALID_DATA, field10: `9${VALID_DATA.field10}` });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("valid US mobile number should pass validation", () => {
    example.set({ ...VALID_DATA, field10: VALID_DATA.field10 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid US mobile number should show custom error message", () => {
    example.set({ ...VALID_DATA, field10: `9${VALID_DATA.field10}` });
    const validation = example.validate();
    expect(validation.errors.field10).toBe("Invalid mobile number");
  });
  test("valid US mobile number should not show custom error message", () => {
    example.set({ ...VALID_DATA, field10: VALID_DATA.field10 });
    const validation = example.validate();
    expect(validation.errors.field10).toBe(undefined);
  });
});

describe("postcodeUK", () => {
  test("invalid UK postcode should not pass validation", () => {
    example.set({ ...VALID_DATA, field11: "invalid" });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("valid UK postcode should pass validation", () => {
    example.set({ ...VALID_DATA, field11: VALID_DATA.field11 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid UK postcode should show custom error message", () => {
    example.set({ ...VALID_DATA, field11: "invalid" });
    const validation = example.validate();
    expect(validation.errors.field11).toBe("Invalid postcode");
  });
  test("valid UK postcode should not show custom error message", () => {
    example.set({ ...VALID_DATA, field11: VALID_DATA.field11 });
    const validation = example.validate();
    expect(validation.errors.field11).toBe(undefined);
  });
});

describe("postcodeUS", () => {
  test("invalid US postcode should not pass validation", () => {
    example.set({ ...VALID_DATA, field12: "invalid" });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
  });
  test("valid US postcode should pass validation", () => {
    example.set({ ...VALID_DATA, field12: VALID_DATA.field12 });
    const validation = example.validate();
    expect(validation.valid).toBe(true);
  });
  test("invalid US postcode should show custom error message", () => {
    example.set({ ...VALID_DATA, field12: "invalid" });
    const validation = example.validate();
    expect(validation.errors.field12).toBe("Invalid postcode");
  });
  test("valid US postcode should not show custom error message", () => {
    example.set({ ...VALID_DATA, field12: VALID_DATA.field12 });
    const validation = example.validate();
    expect(validation.errors.field12).toBe(undefined);
  });
});

describe("mixed", () => {
  test("empty value should not pass required rule", () => {
    example.set({ ...VALID_DATA, field7: "" });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors.field7).toBe("Required");
  });
  test("value greater than max should not pass max rule", () => {
    example.set({ ...VALID_DATA, field7: `${VALID_DATA.field7}1` });
    const validation = example.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors.field7).toBe("Too large, must be 5 or less");
  });
});
