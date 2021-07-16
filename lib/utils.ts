import {ValueType} from "./types";

export function length(normal, [min = 0, max = Infinity]): boolean {
  let size = 0;
  switch (normal.type) {
    case ValueType.nullish:
      size = 0;
      break;
    case ValueType.boolean:
      size = normal.value ? 1 : 0;
      break;
    case ValueType.string:
      size = normal.value.length;
      break;
    case ValueType.file:
      size = normal.size;
      break;
    case ValueType.number:
      size = normal.value;
      break;
    default:
      if (normal.type === ValueType.object) {
        if (normal.value.hasOwnProperty("length")) {
          size = normal.value.length;
        }
      }
  }
  return size >= min && size <= max;
}

export function formatMessage(message, params = {}): string {
  let formattedMessage = message;
  for (const param in params) {
    if (!params.hasOwnProperty(param)) {
      continue;
    }
    formattedMessage = formattedMessage.replace(`:${param}`, params[param]);
  }
  return formattedMessage;
}

export function pattern(normal, regex): boolean {
  return regex.test(normal.value);
}
