import { randomBytes } from "crypto";
import randomNumber from "random-number-csprng";

const hex = (): string => {
  return randomBytes(2).toString("hex").slice(0, 1);
};

export const getRandomValue = (length: number): string => {
  return randomBytes(Math.ceil((length * 3) / 4))
    .toString("base64")
    .replace(/\+/g, hex())
    .replace(/\//g, hex())
    .replace(/=/g, hex())
    .slice(0, length);
};

export const getRandomNumber = async (length: number): Promise<number> => {
  const value = [await randomNumber(1, 9)];

  for (let i = 1; i < length; i++) {
    value.push(await randomNumber(0, 9));
  }

  return parseInt(value.join(""), 10);
};
