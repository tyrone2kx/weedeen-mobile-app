export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

export const isObject = (value: unknown): value is object =>
  typeof value === 'object';

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

export type ValueTypes =
  | string
  | number
  | boolean
  | object
  | undefined
  | unknown[];

export const getStringValue = <T>(value: T) => {
  if (isString(value)) {
    return value;
  }
  return undefined;
};

export const getObjectValue = <T>(value: T) => {
  if (isObject(value)) {
    return value;
  }
  return undefined;
};
