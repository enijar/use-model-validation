export default function formatMessage(message, params = {}) {
  let formattedMessage = message;
  for (const param in params) {
    if (!params.hasOwnProperty(param)) {
      continue;
    }
    formattedMessage = formattedMessage.replace(`:param`, params[param]);
  }
  return formattedMessage;
}
