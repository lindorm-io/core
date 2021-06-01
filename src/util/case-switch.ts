import { camelCase, snakeCase } from "lodash";
import { isArrayStrict, isObjectStrict } from "./strict-type";

export type AnyObject = Record<string, any>;
export type Callback = (arg: string) => string;

const convertArrayValuesTo = (input: Array<string>, callback: Callback): Array<string> => {
  if (!isArrayStrict(input)) {
    throw new Error(`Invalid input [ ${typeof input} ]`);
  }

  const result: Array<string> = [];

  for (const value of input) {
    result.push(callback(value));
  }

  return result;
};

const convertObjectKeysTo = <Input extends AnyObject, Output extends AnyObject>(
  input: Input,
  callback: Callback,
): Output => {
  if (!isObjectStrict(input)) {
    throw new Error(`Invalid input [ ${typeof input} ]`);
  }

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(input)) {
    if (isObjectStrict(value)) {
      result[callback(key)] = convertObjectKeysTo(value, callback);
    } else {
      result[callback(key)] = value;
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

export const camelKeys = <Input extends AnyObject, Output extends AnyObject>(input: Input): Output => {
  return convertObjectKeysTo<Input, Output>(input, camelCase);
};

export const snakeArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, snakeCase);
};

export const snakeKeys = <Input extends AnyObject, Output extends AnyObject>(input: Input): Output => {
  return convertObjectKeysTo<Input, Output>(input, snakeCase);
};

export const pascalArray = (input: Array<string>): Array<string> => {
  return convertArrayValuesTo(input, pascalCase);
};

export const pascalKeys = <Input extends AnyObject, Output extends AnyObject>(input: Input): Output => {
  return convertObjectKeysTo<Input, Output>(input, pascalCase);
};
