import { camelCase, isArray, isDate, isError, isObject, snakeCase } from "lodash";

type TCaseFunction = (arg: string) => string;

const isObjectStrict = (input: unknown): boolean => {
  return isObject(input) && !isArray(input) && !isDate(input) && !isError(input);
};

const convertArrayValuesTo = (input: Array<string>, caseFunction: TCaseFunction): Array<string> => {
  if (!isArray(input)) return input;

  const result: Array<string> = [];

  for (const value of input) {
    result.push(caseFunction(value));
  }

  return result;
};

const convertObjectKeysTo = (input: Record<string, any>, caseFunction: TCaseFunction): Record<string, any> => {
  if (!isObjectStrict(input)) return input;

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(input)) {
    if (isObjectStrict(value)) {
      result[caseFunction(key)] = convertObjectKeysTo(value, caseFunction);
    } else {
      result[caseFunction(key)] = value;
    }
  }

  return result;
};

export const pascalCase = (string: string): string => {
  const [first, ...rest] = camelCase(string);
  return first.toUpperCase().concat(...rest);
};

export const camelArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, camelCase);
};

export const camelKeys = (input: Record<string, any>): Record<string, any> => {
  return convertObjectKeysTo(input, camelCase);
};

export const snakeArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, snakeCase);
};

export const snakeKeys = (input: Record<string, any>): Record<string, any> => {
  return convertObjectKeysTo(input, snakeCase);
};

export const pascalArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, pascalCase);
};

export const pascalKeys = (input: Record<string, any>): Record<string, any> => {
  return convertObjectKeysTo(input, pascalCase);
};
