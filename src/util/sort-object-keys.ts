type AnyObject = Record<string, any>;

export const sortObjectKeys = <Input extends AnyObject, Output extends AnyObject>(input: Input): Output => {
  const result: Record<string, any> = {};

  for (const key of Object.keys(input).sort()) {
    result[key] = input[key];
  }

  return result as Output;
};
