export type Value = any;

export type Error = {
  [key: string]: string | Error;
};

export type Data = {
  [key: string]: Value;
};

export enum ValueType {
  string = "string",
  number = "number",
  array = "array",
  file = "file",
  nullish = "nullish",
  boolean = "boolean",
  object = "object",
}

export type NormalizedValue = {
  type: ValueType;
  value: Value;
};

export type Validation = {
  errors: Error;
  valid: boolean;
  data: Data;
};

export type Rules = {
  [key: string]: Function[];
};

export type RuleMethods = {
  [key: string]: Function;
};

export type Events = {
  [key: string]: Function[];
};

export type Model = {
  set: (data: Data | Function) => Data;
  update: (data: Data | Function) => Data;
  validate: () => Validation;
  fresh: (data?: Data) => Model;
  get: () => Data;
  on: (event: string, fn: Function) => void;
  off: (event: string, fn: Function) => void;
};
