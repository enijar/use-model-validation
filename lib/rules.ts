import { RuleMethods } from "./types";
import { formatMessage, length, pattern } from "./utils";

const R: RuleMethods = {
  required: (message = "Required") => (normal) => ({
    pass: length(normal, [1, Infinity]),
    message: formatMessage(message),
  }),
  min(min, message = "Too small, min: :min") {
    if (typeof min === "function") {
      min = min();
    }
    return (normal) => {
      return {
        pass: !length(normal, [1]) ? true : length(normal, [min, Infinity]),
        message: formatMessage(message, { min }),
      };
    };
  },
  max(max, message = "Too large, max: :max") {
    if (typeof max === "function") {
      max = max();
    }
    return (normal) => {
      return {
        pass: length(normal, [0, max]),
        message: formatMessage(message, { max }),
      };
    };
  },
  between(range, message = "Out of range, must be between :min and :max") {
    if (typeof range === "function") {
      range = range();
    }
    const [min, max] = range;
    return (normal) => ({
      pass: !length(normal, [1]) ? true : length(normal, [min, max]),
      message: formatMessage(message, { min, max }),
    });
  },
  test(fn, message = "Invalid") {
    return (normal, data = {}) => ({
      pass: fn(data),
      message: formatMessage(message),
    });
  },
  format(regex, message = "Invalid format") {
    return (normal) => ({
      pass: !length(normal, [1]) ? true : pattern(normal, regex),
      message: formatMessage(message, { regex }),
    });
  },
  email(message = "Invalid email") {
    return this.format(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message
    );
  },
  mobileUK(message = "Invalid mobile number") {
    return this.format(
      /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/,
      message
    );
  },
  mobileUS(message = "Invalid mobile number") {
    return this.format(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/, message);
  },
  postcodeUK(message = "Invalid postcode") {
    return this.format(
      /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/,
      message
    );
  },
  postcodeUS(message = "Invalid postcode") {
    return this.format(/^\d{5}(?:[-\s]\d{4})?$/, message);
  },
};

// Add a custom rule
R.add = (rule: string, fn: Function) => {
  R[rule] = fn;
};

export default R;
