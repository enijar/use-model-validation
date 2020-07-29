import { rules } from "./types";
import { length, formatMessage, pattern } from "./utils";

const R: rules = {
  required: (message = "Required") => (normal) => ({
    pass: length(normal, [0, Infinity]),
    message: formatMessage(message),
  }),
  min(min, message = "Too small, min: :min") {
    return (normal) => ({
      pass: !length(normal, [1]) ? true : length(normal, [min, Infinity]),
      message: formatMessage(message, { min }),
    });
  },
  max(max, message = "Too large, max: :max") {
    return (normal) => ({
      pass: length(normal, [0, max]),
      message: formatMessage(message, { max }),
    });
  },
  between([min, max], message = "Out of range, must be between :min and :max") {
    return (normal) => ({
      pass: !length(normal, [1]) ? true : length(normal, [min, max]),
      message: formatMessage(message, { min, max }),
    });
  },
  format(regex, message = "Invalid format") {
    return (normal) => ({
      pass: !length(normal, [1]) ? true : pattern(normal, regex),
      message: formatMessage(message, { regex }),
    });
  },
};

// Add a custom rule
R.add = (rule: string, fn: Function) => {
  R[rule] = fn;
};

export default R;
