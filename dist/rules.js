"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var R = {
    required: function (message) {
        if (message === void 0) { message = "Required"; }
        return function (normal) { return ({
            pass: utils_1.length(normal, [1, Infinity]),
            message: utils_1.formatMessage(message),
        }); };
    },
    min: function (min, message) {
        if (message === void 0) { message = "Too small, min: :min"; }
        if (typeof min === "function") {
            min = min();
        }
        return function (normal) {
            return {
                pass: !utils_1.length(normal, [1]) ? true : utils_1.length(normal, [min, Infinity]),
                message: utils_1.formatMessage(message, { min: min }),
            };
        };
    },
    max: function (max, message) {
        if (message === void 0) { message = "Too large, max: :max"; }
        if (typeof max === "function") {
            max = max();
        }
        return function (normal) {
            return {
                pass: utils_1.length(normal, [0, max]),
                message: utils_1.formatMessage(message, { max: max }),
            };
        };
    },
    between: function (range, message) {
        if (message === void 0) { message = "Out of range, must be between :min and :max"; }
        if (typeof range === "function") {
            range = range();
        }
        var min = range[0], max = range[1];
        return function (normal) { return ({
            pass: !utils_1.length(normal, [1]) ? true : utils_1.length(normal, [min, max]),
            message: utils_1.formatMessage(message, { min: min, max: max }),
        }); };
    },
    test: function (fn, message) {
        if (message === void 0) { message = "Invalid"; }
        return function (normal, data) {
            if (data === void 0) { data = {}; }
            return ({
                pass: fn(data),
                message: utils_1.formatMessage(message),
            });
        };
    },
    format: function (regex, message) {
        if (message === void 0) { message = "Invalid format"; }
        return function (normal) { return ({
            pass: !utils_1.length(normal, [1]) ? true : utils_1.pattern(normal, regex),
            message: utils_1.formatMessage(message, { regex: regex }),
        }); };
    },
};
// Add a custom rule
R.add = function (rule, fn) {
    R[rule] = fn;
};
exports.default = R;
