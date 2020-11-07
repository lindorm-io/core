import { TFunction, TObject } from "../typing";
import { camelCase, isArray, isDate, isError, isObject, snakeCase } from "lodash";

const isObjectStrict = (input: unknown): boolean => {
  return isObject(input) && !isArray(input) && !isDate(input) && !isError(input);
};

const convertArrayValuesTo = (input: Array<string>, caseFunction: TFunction<string>): Array<string> => {
  if (!isArray(input)) return input;

  const result: Array<string> = [];

  for (const value of input) {
    result.push(caseFunction(value));
  }

  return result;
};

const convertObjectKeysTo = (input: TObject<any>, caseFunction: TFunction<string>): TObject<any> => {
  if (!isObjectStrict(input)) return input;

  const result: TObject<any> = {};

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

export const camelKeys = (input: TObject<any>): TObject<any> => {
  return convertObjectKeysTo(input, camelCase);
};

export const snakeArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, snakeCase);
};

export const snakeKeys = (input: TObject<any>): TObject<any> => {
  return convertObjectKeysTo(input, snakeCase);
};

export const pascalArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, pascalCase);
};

export const pascalKeys = (input: TObject<any>): TObject<any> => {
  return convertObjectKeysTo(input, pascalCase);
};
