import { dataType, rulesType, validationType } from "./types";
import normalizeValue from "./normalize-value";

export default function validate(
  data: dataType,
  rules: rulesType = {}
): validationType {
  const validation = {
    errors: {},
    valid: true,
  };
  for (const field in rules) {
    if (!rules.hasOwnProperty(field)) {
      continue;
    }
    const normalizedValue = normalizeValue(data[field]);
    rules[field].forEach((rule) => {
      const result = rule(normalizedValue);
      if (!result.pass) {
        validation.valid = false;
        validation.errors[field] = result.message;
      }
    });
  }
  return validation;
}
