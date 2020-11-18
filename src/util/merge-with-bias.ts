import { TObject } from "../typing";

export const mergeObjectsWithBias = (primary: TObject<any>, secondary: TObject<any>): TObject<any> => {
  const object: TObject<any> = secondary;

  for (const [key, value] of Object.entries(primary)) {
    if (value === null || value === undefined) continue;
    object[key] = value;
  }

  return object;
};
