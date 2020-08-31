"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validate_data_1 = __importDefault(require("./validate-data"));
function createModel(_a) {
    var rules = _a.rules, _b = _a.data, data = _b === void 0 ? {} : _b;
    function update(freshData) {
        if (freshData === void 0) { freshData = {}; }
        if (typeof freshData === "function") {
            freshData = __assign({}, freshData(data));
        }
        for (var field in freshData) {
            if (!freshData.hasOwnProperty(field)) {
                continue;
            }
            data[field] = freshData[field];
        }
    }
    function get() {
        return __assign({}, data);
    }
    function set(newData) {
        if (typeof newData === "function") {
            newData = __assign({}, newData(data));
        }
        for (var field in data) {
            if (!data.hasOwnProperty(field)) {
                continue;
            }
            delete data[field];
        }
        for (var field in newData) {
            if (!newData.hasOwnProperty(field)) {
                continue;
            }
            data[field] = newData[field];
        }
    }
    return {
        set: function (data) {
            set(data);
            return this.get();
        },
        update: function (data) {
            update(data);
            return get();
        },
        validate: function () {
            return validate_data_1.default(data, rules);
        },
        get: function () {
            return get();
        },
    };
}
exports.default = createModel;
