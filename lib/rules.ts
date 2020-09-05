import { ruleMethodsType } from "./types";
import { formatMessage, length, pattern } from "./utils";

const R: ruleMethodsType = {
  required: (message = "Required") => (normal) => ({
    pass: length(normal, [1, Infinity]),
    message: formatMessage(message),
  }),
  min(min, message = "Too small, min: :min") {
    if (typeof min === "function") {
      min = min();
    }
    return (normal) => {
      return {
        pass: !length(normal, [1]) ? true : length(normal, [min, Infinity]),
        message: formatMessage(message, { min }),
      };
    };
  },
  max(max, message = "Too large, max: :max") {
    if (typeof max === "function") {
      max = max();
    }
    return (normal) => {
      return {
        pass: length(normal, [0, max]),
        message: formatMessage(message, { max }),
      };
    };
  },
  between(range, message = "Out of range, must be between :min and :max") {
    if (typeof range === "function") {
      range = range();
    }
    const [min, max] = range;
    return (normal) => ({
      pass: !length(normal, [1]) ? true : length(normal, [min, max]),
      message: formatMessage(message, { min, max }),
    });
  },
  test(fn, message = "Invalid") {
    return (normal, data = {}) => ({
      pass: fn(data),
      message: formatMessage(message),
    });
  },
  format(regex, message = "Invalid format") {
    return (normal) => ({
      pass: !length(normal, [1]) ? true : pattern(normal, regex),
      message: formatMessage(message, { regex }),
    });
  },
  email(message = "Invalid format") {
    return this.format(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, message);
  },
};

// Add a custom rule
R.add = (rule: string, fn: Function) => {
  R[rule] = fn;
};

export default R;
