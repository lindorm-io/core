import { isArray, isDate, isError, isObject as _isObject } from "lodash";

export const isObject = (input: unknown): boolean => {
  return _isObject(input) && !isArray(input) && !isDate(input) && !isError(input);
};
