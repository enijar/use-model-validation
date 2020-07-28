import { rules } from "./types";
import { length, formatMessage } from "./utils";

const R: rules = {
  required: (message = "Required") => (normal) => ({
    pass: length(normal, [0, Infinity]),
    message: formatMessage(message),
  }),
  min(min, message = "Too small, min: :min") {
    return (normal) => ({
      pass: length(normal, [min, Infinity]),
      message: formatMessage(message, { min }),
    });
  },
  max(max, message = "Too large, max: :max") {
    return (normal) => ({
      pass: length(normal, [0, max]),
      message: formatMessage(message, { max }),
    });
  },
};

// Add a custom rule
R.add = (rule: string, fn: Function) => {
  R[rule] = fn;
};

export default R;
