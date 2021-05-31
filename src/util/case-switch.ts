import { camelCase, isArray, snakeCase } from "lodash";
import { isObject } from "./is-object";

type TCaseFunction = (arg: string) => string;

const convertArrayValuesTo = (input: Array<string>, caseFunction: TCaseFunction): Array<string> => {
  if (!isArray(input)) return input;

  const result: Array<string> = [];

  for (const value of input) {
    result.push(caseFunction(value));
  }

  return result;
};

const convertObjectKeysTo = <Output>(input: Record<string, any>, caseFunction: TCaseFunction): Output => {
  if (!isObject(input)) return input as Output;

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(input)) {
    if (isObject(value)) {
      result[caseFunction(key)] = convertObjectKeysTo(value, caseFunction);
    } else {
      result[caseFunction(key)] = value;
    }
  }

  return result as Output;
};

export const pascalCase = (string: string): string => {
  const [first, ...rest] = camelCase(string);
  return first.toUpperCase().concat(...rest);
};

export const camelArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, camelCase);
};

export const camelKeys = <Output>(input: Record<string, any>): Output => {
  return convertObjectKeysTo<Output>(input, camelCase);
};

export const snakeArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, snakeCase);
};

export const snakeKeys = <Output>(input: Record<string, any>): Output => {
  return convertObjectKeysTo<Output>(input, snakeCase);
};

export const pascalArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, pascalCase);
};

export const pascalKeys = <Output>(input: Record<string, any>): Output => {
  return convertObjectKeysTo<Output>(input, pascalCase);
};
