import { Data, Rules, Validation } from "./types";
import normalizeValue from "./normalize-value";

export default function validate(
  data: Data,
  rules: Rules = {}
): Validation {
  const validation = {
    errors: {},
    valid: true,
    data: {},
  };
  for (const field in rules) {
    if (!rules.hasOwnProperty(field)) {
      continue;
    }
    const normal = normalizeValue(data[field]);
    rules[field].forEach((rule) => {
      if (validation.errors.hasOwnProperty(field)) {
        return;
      }
      const result = rule(normal, data);
      if (!result.pass) {
        validation.valid = false;
        validation.errors[field] = result.message;
        delete validation.data[field];
      } else {
        validation.data[field] = data[field];
      }
    });
  }
  return validation;
}
