import { NormalizedValue, Value, ValueType } from "./types";

const mode =
  typeof module !== "undefined" && module.exports ? "node" : "browser";

export default function normalizeValue(value: Value): NormalizedValue {
  let type;
  let normal: Value = value;
  const t = (typeof value).toLowerCase();

  switch (t) {
    case ValueType.string:
      normal = value.trim();
      type = ValueType.string;
      break;
    case ValueType.number:
      normal = parseFloat(value);
      type = ValueType.number;
      break;
    case ValueType.boolean:
      type = ValueType.boolean;
      break;
    case ValueType.object:
      type = ValueType.object;
      break;
    default:
      if (Array.isArray(value)) {
        type = ValueType.array;
        break;
      }
      if (mode === "browser" && value instanceof File) {
        type = ValueType.file;
        break;
      }
      if (mode === "node" && value.hasOwnProperty("buffer")) {
        type = ValueType.file;
        break;
      }
      if ([undefined, null].indexOf(value) > -1) {
        type = ValueType.nullish;
        normal = null;
        break;
      }
  }

  return { type, value: normal };
}
