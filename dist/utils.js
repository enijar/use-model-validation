"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pattern = exports.formatMessage = exports.length = void 0;
function length(normal, _a) {
    var _b = _a[0], min = _b === void 0 ? 0 : _b, _c = _a[1], max = _c === void 0 ? Infinity : _c;
    var size = 0;
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
    if (normal.type === "number") {
        size = normal.value;
    }
    if (normal.type === "object") {
        if (normal.value.hasOwnProperty("length")) {
            size = normal.value.length;
        }
    }
    return size >= min && size <= max;
}
exports.length = length;
function formatMessage(message, params) {
    if (params === void 0) { params = {}; }
    var formattedMessage = message;
    for (var param in params) {
        if (!params.hasOwnProperty(param)) {
            continue;
        }
        formattedMessage = formattedMessage.replace(":" + param, params[param]);
    }
    return formattedMessage;
}
exports.formatMessage = formatMessage;
function pattern(normal, regex) {
    return regex.test(String(normal.value));
}
exports.pattern = pattern;
