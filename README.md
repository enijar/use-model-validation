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
