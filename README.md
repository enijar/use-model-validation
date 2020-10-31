# Use Model

Store data in a model and validate that data anywhere

### Installation

```bash
npm add use-model-validation
```

### Example Usage

```js
import { R, createModel } from "use-model-validation";

// Define a person model with rules
const person = createModel({
  rules: {
    firstName: [R.max(10, "Too long, must be :max characters or less")],
    lastName: [R.max(20, "Too long, must be :max characters or less")],
    email: [R.required("Email is required")],
  },
});

// Update the person model with some data
console.log(person.update({ firstName: "James", lastName: "Craig", email: "test" }));

// Validate model, using the rules defined inside createModel
console.log(person.validate());

// Set model data (pass an empty object to reset data)
console.log(person.set({}));
```

### Adding Custom Rules

You can add a custom rule to the validator `R` object.

#### Basic Example

```js
import { R, utils } from "use-model-validation";

R.add("barcode", (message = "Invalid barcode") => {
  return (normal) => ({
    // utils.length makes this rule optional so it can be used with R.required
    pass: !utils.length(normal, [1])
      ? true
      : /^123456\d{8}$/.test(normal.value),
    message,
  });
});
```

#### Example with Params

```js
import { R, utils } from "use-model-validation";

R.add(
  "between",
  ([min, max], message = "Out of range, must be between :min and :max") => {
    return (normal) => ({
      // utils.length makes this rule optional so it can be used with R.required
      pass: !utils.length(normal, [1])
        ? true
        : utils.length(normal, [min, max]),
      message: utils.formatMessage(message, { min, max }),
    });
  }
);
```

### Rules

Documentation of built-in rules.

| Rule | Description | Usage |
|---|---|---|
| required | Check if any file, string, number, or array value has a size > 0 | `R.required("Required")` |
| min | Check if any file, string, number, or array value has a size > min | `R.min(1, "Too small, must be :min or more")` |
| max | Check if any file, string, number, or array value has a size < max | `R.min(2, "Too large, must be :max or less")` |
| between | Check if any file, string, number, or array value has a size between min and max | `R.between([1, 2], "Wrong range, must be between :min and :max")` |
| test | Check if a custom function passes | `R.test((data) => data.field === "blah", "Field must be blah")` |
| format | Check if a value matches a format | `R.format(/^[0-9]$/, "Must be a single digit number")` |
| email | Check if a value is a valid email | `R.email("Invalid email")` |
| mobileUK | Check if a value is a valid UK mobile number | `R.mobileUK("Invalid mobile number")` |
| mobileUS | Check if a value is a valid US mobile number | `R.mobileUS("Invalid mobile number")` |
| postcodeUK | Check if a value is a valid UK postcode | `R.postcodeUK("Invalid postcode")` |
| postcodeUS | Check if a value is a valid US postcode | `R.postcodeUS("Invalid postcode")` |

### Feature Milestones

- [x] Event emitter per model
- [ ] Global event emitter for all models (created, updated, error)
- [ ] Global field rule definitions
- [ ] Global field error message definitions
- [x] Better TypeScript support
- [x] 100% test coverage
