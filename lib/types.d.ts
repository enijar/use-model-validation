export type valueType = any;

export type normalizedValueType = {
  type: string;
  value: valueType;
};

export type validationType = {
  errors: {
    [key: string]: string;
  };
  valid: boolean;
  data: object;
};

export type dataType = {
  [key: string]: valueType;
};

export type rulesType = {
  [key: string]: Array<Function>;
};

export type ruleMethodsType = {
  [key: string]: Function;
};
