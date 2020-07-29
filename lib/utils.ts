export function length(normal, [min = 0, max = Infinity]) {
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

export function formatMessage(message, params = {}) {
  let formattedMessage = message;
  for (const param in params) {
    if (!params.hasOwnProperty(param)) {
      continue;
    }
    formattedMessage = formattedMessage.replace(`:param`, params[param]);
  }
  return formattedMessage;
}

export function pattern(normal, regex) {
  // Only strings can be pattern matched
  if (normal.type !== "string") {
    // @todo more thinking is needed about weather to throw an error or return true/false here
    return true;
  }
  return normal.value.test(regex);
}
