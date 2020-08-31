> Note: this project is in development. No release exists for this yet. All imports in the examples are not the correct package name.

# Use Model

Create, update, and validate a model with data from a form.

### Example Usage

```js
import { R, createModel } from "use-model";

// Define a person model with rules
const person = createModel({
  rules: {
    firstName: [R.max(10, "Too long, must be :max characters or less")],
    lastName: [R.max(20, "Too long, must be :max characters or less")],
    email: [R.required("Email is required")],
  },
});

// Update the person model with some data
console.log(person.update({ email: "test" }));
console.log(person.update({ firstName: "James", lastName: "Craig" }));

// Set model data (pass an empty object to reset data)
console.log(person.set({}));

// Validate model, using the rules defined inside createModel
console.log(person.validate());
```

### Adding Custom Rules

You can add a custom rule to the validator `R` object.

#### Basic Example

```js
import { R, utils } from "use-model";

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
import { R, utils } from "use-model";

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

| Rule | Description | Example |
|---|---|---|
| required | Check if any file, string, number, or array value has a size > 0 | `R.required("Required")` |
| min | Check if any file, string, number, or array value has a size > min | `R.min(1, "Too small, must be :min or more")` |
| max | Check if any file, string, number, or array value has a size < max | `R.min(2, "Too large, must be :max or less")` |
| between | Check if any file, string, number, or array value has a size between min and max | `R.between([1, 2], "Wrong range, must be between :min and :max")` |
| test | Check if a custom function passes | `R.test((data) => data.field === "blah", "Field must be blah")` |
| format | Check if a value matches a format | `R.format(/^[0-9]$/, "Must be a single digit number")` |

### Feature Milestones

- [ ] Event emitter per model
- [ ] Global event emitter for all models (created, updated, error)
- [ ] Global field rule definitions
- [ ] Global field error message definitions
- [x] Better TypeScript support
- [x] 100% test coverage
