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
};

export type dataType = {
  [key: string]: valueType;
};

export type rulesType = {
  [key: string]: Array<Function>;
};
