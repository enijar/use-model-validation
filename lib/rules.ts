import { rules } from "./types";
import { length, formatMessage } from "./utils";

const R: rules = {
  required: (message) => (normal) => ({
    pass: length(normal, [0, Infinity]),
    message: formatMessage(message || "required"),
  }),
  min(min, message) {
    return (normal) => ({
      pass: length(normal, [min, Infinity]),
      message: formatMessage(message || "Too small, min: :min", { min }),
    });
  },
  max(max, message) {
    return (normal) => ({
      pass: length(normal, [0, max]),
      message: formatMessage(message || "Too large, max: :max", { max }),
    });
  },
};

// Add a custom rule
R.add = (rule: string, fn: Function) => {
  R[rule] = fn;
};

export default R;
