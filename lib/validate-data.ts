import { get as _get, set as _set, unset as _unset, has as _has } from "lodash";
import { Data, Rules, Validation } from "./types";
import normalizeValue from "./normalize-value";

export default function validate(data: Data, rules: Rules = {}): Validation {
  const validation = {
    errors: {},
    valid: true,
    data: {},
  };
  for (const field in rules) {
    if (!rules.hasOwnProperty(field)) {
      continue;
    }
    const value = _get(data, field);
    const normal = normalizeValue(value);
    for (const rule of rules[field]) {
      if (_has(validation.errors, field)) {
        continue;
      }
      const result = rule(normal, data);
      if (!result.pass) {
        validation.valid = false;
        validation.errors[field] = result.message;
        _unset(validation.data, field);
      } else {
        const value = _get(data, field);
        _set(validation.data, field, value);
      }
    }
  }
  return validation;
}
