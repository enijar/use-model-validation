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
    // utils.length makes this rule pass until there is a value, so that R.required may be optional
    pass: !utils.length(normal, [1])
      ? true
      : /^123456\d{8}$/.test(normal.value),
    message,
  });
});
```

#### Example with Params

```js
R.add("between", ([min, max], message = "Out of range, must be between :min and :max") => {
  return (normal) => ({
    // utils.length makes this rule pass until there is a value, so that R.required may be optional
    pass: !utils.length(normal, [1]) ? true : utils.length(normal, [min, max]),
    message: utils.formatMessage("Out of range, must be between :min and :max", { min, max }),
  });
});
```

### Feature Milestones

- [ ] Event emitter per model
- [ ] Global event emitter for all models (created, updated, error)
- [ ] Global field rule definitions
- [ ] Global field error message definitions
- [ ] Better TypeScript support
- [ ] 100% test coverage
