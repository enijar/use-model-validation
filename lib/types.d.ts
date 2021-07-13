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

export type EventsType = {
  [key: string]: Array<Function>;
};

export type Model = {
  set: (data: dataType | Function) => dataType;
  update: (data: dataType | Function) => dataType;
  validate: () => validationType;
  fresh: (data?: dataType) => Model;
  get: () => dataType;
  on: (event: string, fn: Function) => void;
  off: (event: string, fn: Function) => void;
};
