"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var mode = ((_b = (_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.process) === null || _a === void 0 ? void 0 : _a.release) === null || _b === void 0 ? void 0 : _b.name) || "browser";
function normalizeValue(value) {
    var type = typeof value;
    var normal = value;
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
    return { type: type, value: normal };
}
exports.default = normalizeValue;
