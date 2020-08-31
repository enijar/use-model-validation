import { normalizedValueType, valueType } from "./types";

const mode = globalThis?.process?.release?.name || "browser";

export default function normalizeValue(value: valueType): normalizedValueType {
  let type: string = typeof value;
  let normal: valueType = value;

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
      if ([undefined, null].indexOf(value) > -1) {
        type = "nullish";
        normal = null;
      }
  }

  return { type, value: normal };
}
