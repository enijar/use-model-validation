# Use Model

Store data in a model and validate that data anywhere

### Installation

```bash
npm add use-model-validation
```

### Example Usage

```js
import { R, createModel } from "use-model-validation";

const model = createModel({
  rules: {
    firstName: [R.max(10, "Too long, must be :max characters or less")],
    lastName: [R.max(20, "Too long, must be :max characters or less")],
    email: [R.required("Email is required")],
  },
});

// Update the model with some data
person.update({ firstName: "James", lastName: "Craig", email: "test" });

// Validate the model, using the model's rules
const { valid, errors, data } = person.validate();

// Set model data (pass an empty object to reset data)
console.log(person.set({}));
```

### Why?

Have you ever ran into the situation where you are having to perform validation on the client and then copy/paste the same validation on the server? This library allows you to define your validation in a single place, then re-use the validation logic anywhere (i.e. on the client and server). Take a look at this, for example:

**Define a shared model (/shared/models/user-model.js)**

```js
module.exports = createModel({
  rules: {
    firstName: [
      R.required("First name is required"),
      R.max(255, "First name is too large, max characters is :max"),
    ],
    lastName: [
      R.required("Last name is required"),
      R.max(255, "Last name is too large, max characters is :max"),
    ],
    email: [
      R.required("Email name is required"),
      R.email("Email is an invalid format"),
      R.max(255, "Email is too large, max characters is :max"),
    ],
  },
});
```

**Server Route Handler (/server/actions/new-user.js)**

```js
const userModel = require("/shared/models/user-model.js");

function newUser(req, res) {
  // Make a fresh instance of the model (to avoid race conditions)
  const user = userModel.fresh(req.body);

  const { valid, errors, data } = user.validate();

  if (!valid) {
    res.status(422).json({ errors });
  }

  // Do something with `data`, e.g. save to DB

  res.status(201).json({ messages: { server: "New user created" } });
}
```

**Client UI (/client/pages/new-user.js)**

```jsx
import userModel from "/shared/models/user-model.js";

function NewUser() {
  const [errors, setErrors] = React.useState({});

  const onChange = React.useCallback((event) => {
    const { name, value } = event.target;
    userModel.update({ [name]: value });
  }, []);

  const onSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();

      const { valid, errors, data } = userModel.validate();

      setErrors(errors);

      if (valid) {
        const res = await fetch("/api/new-user", {
          method: "post",
          body: JSON.stringify(data),
        });

        const body = await res.json();

        if (res.status === 422) {
          setErrors(body);
        } else {
          // Do something on success
        }
      }
    },
    [setErrors]
  );

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" onChange={onChange} />
        <div>{errors?.firstName}</div>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" onChange={onChange} />
        <div>{errors?.lastName}</div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" onChange={onChange} />
        <div>{errors?.email}</div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
```

In the above example, the model rules are validated once and the validation logic is reused on the client and server. This allows for code sharing for full-stack JS apps.

### Adding Custom Rules

You can add any custom rule to the validator by defining a function and using the `R.test` rule:

```js
import { R } from "use-model-validation";

// Custom rule to check if a field matches another field
function match(fields, message) {
  return R.test((data) => {
    return data[fields[0]] === data[fields[1]];
  }, message);
}

const newPassword = createModel({
  rules: {
    password: [R.required("This field is required")],
    passwordConfirmation: [
      R.required("This field is required"),
      match(["password", "passwordConfirmation"], "Passwords don't match"),
    ],
  },
});
```

### Rules

Documentation of built-in rules.

| Rule       | Description                                                                      | Usage                                                             |
| ---------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| required   | Check if any file, string, number, or array value has a size > 0                 | `R.required("Required")`                                          |
| min        | Check if any file, string, number, or array value has a size >= min              | `R.min(1, "Too small, must be :min or more")`                     |
| max        | Check if any file, string, number, or array value has a size <= max              | `R.min(2, "Too large, must be :max or less")`                     |
| between    | Check if any file, string, number, or array value has a size between min and max | `R.between([1, 2], "Wrong range, must be between :min and :max")` |
| test       | Check if a custom function passes                                                | `R.test((data) => data.field === "blah", "Field must be blah")`   |
| format     | Check if a value matches a format                                                | `R.format(/^[0-9]$/, "Must be a single digit number")`            |
| email      | Check if a value is a valid email                                                | `R.email("Invalid email")`                                        |
| mobileUK   | Check if a value is a valid UK mobile number                                     | `R.mobileUK("Invalid mobile number")`                             |
| mobileUS   | Check if a value is a valid US mobile number                                     | `R.mobileUS("Invalid mobile number")`                             |
| postcodeUK | Check if a value is a valid UK postcode                                          | `R.postcodeUK("Invalid postcode")`                                |
| postcodeUS | Check if a value is a valid US postcode                                          | `R.postcodeUS("Invalid postcode")`                                |

### Model API

#### set

Override data on the model, e.g.:

```js
// Delete all fields
model.set({});

// Override firstName field but leave other fields untouched
mode.set((data) => {
  data.firstName = data.firstName.toUpperCase();
  return data;
});
```

#### update

Similar to `set` except fields will not be reset, e.g.:

```js
// Update only the firstName field
model.update({ firstName: "Test" });

// Uppercase all fields
model.update((data) => {
  for (const field in data) {
    data[field].toUpperCase();
  }
  return data;
});
```

#### validate

Validate the model and return errors (object), valid (boolean), and data (object), e.g.:

```js
const { errors, valid, data } = model.validate();

if (valid) {
  console.log(data);
} else {
  console.log(errors);
}
```

#### fresh

Create a fresh instance of the model, e.g.:

```js
const newModel = model.fresh({ firstName: "New" });

const { firstName: firstName1 } = model.get();
const { firstName: firstName2 } = newModel.get();

// firstName1 will now be different from firstName2
```

#### get

Get data stored in the model, e.g.:

```js
model.set({ firstName: "Foo", lastName: "Bar" });
const data = model.get();
// data will now contain: { firstName: "Foo", lastName: "Bar" }
```

#### on/off

Add/remove event listener, e.g.:

```js
function onSet(newData) {
  console.log(newData);
}
function onUpdate(newData) {
  console.log(newData);
}
function onValidate(result) {
  console.log(result);
}

// Add/remove listeners
model.on("set", onSet);
model.off("set", onSet);
model.on("update", onUpdate);
model.off("update", onUpdate);
model.on("validate", onValidate);
model.off("validate", onValidate);
```

### Milestones

- [x] Event emitter per model
- [ ] Global event emitter for all models (created, updated, error)
- [ ] Global field rule definitions
- [ ] Global field error message definitions
- [x] Better TypeScript support
- [x] \>85% test coverage
