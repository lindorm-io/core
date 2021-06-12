import { getRandomNumber, getRandomValue } from "./random-value";

describe("random-value.ts", () => {
  test("should return a random value", () => {
    const result = getRandomValue(32);

    expect(result).toStrictEqual(expect.any(String));
    expect(result.length).toBe(32);
  });

  test("should return a random number", async () => {
    const result = await getRandomNumber(10);

    expect(result).toStrictEqual(expect.any(Number));
  });
});
