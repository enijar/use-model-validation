"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var normalize_value_1 = __importDefault(require("./normalize-value"));
function validate(data, rules) {
    if (rules === void 0) { rules = {}; }
    var validation = {
        errors: {},
        valid: true,
    };
    var _loop_1 = function (field) {
        if (!rules.hasOwnProperty(field)) {
            return "continue";
        }
        var normalizedValue = normalize_value_1.default(data[field]);
        rules[field].forEach(function (rule) {
            if (validation.errors.hasOwnProperty(field)) {
                return;
            }
            var result = rule(normalizedValue, data);
            if (!result.pass) {
                validation.valid = false;
                validation.errors[field] = result.message;
            }
        });
    };
    for (var field in rules) {
        _loop_1(field);
    }
    return validation;
}
exports.default = validate;
