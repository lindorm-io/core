import { isArray, isDate, isError, isObject, isString } from "lodash";

export const isArrayStrict = (input: unknown): boolean => {
  return isArray(input) && !isString(input);
};

export const isObjectStrict = (input: unknown): boolean => {
  return isObject(input) && !isArray(input) && !isDate(input) && !isError(input);
};
