import { normalizedValueType, valueType } from "./types";

const mode = globalThis.process?.release?.name || "browser";

export default function normalizeValue(value: valueType): normalizedValueType {
  let type: string = typeof value;
  let normal: valueType;

  switch (type) {
    case "string":
      normal = value.trim();
      break;
    case "number":
      normal = parseFloat(value);
      break;
    default:
      if (Array.isArray(value)) {
        type = "array";
      }
      if (mode === "browser" && value instanceof File) {
        type = "file";
      }
      if ([undefined, null].indexOf(value)) {
        type = "nullish";
        value = null;
      }
  }

  return {
    type,
    value: normal,
  };
}
