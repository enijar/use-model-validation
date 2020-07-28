import formatMessage from "./format-message";

function length(normal, [min, max]) {
  let size = 0;
  if (normal.type === "nullish") {
    size = 0;
  }
  if (normal.type === "boolean") {
    size = normal.value ? 1 : 0;
  }
  if (normal.type === "string") {
    size = normal.value.length;
  }
  if (normal.type === "file") {
    size = normal.size;
  }
  if (normal.type === "object" && normal.value.hasOwnProperty("length")) {
    size = normal.value.length;
  }
  return size >= min && size <= max;
}

export default {
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
