import { camelArray, camelKeys, pascalArray, pascalCase, pascalKeys, snakeArray, snakeKeys } from "./case-switch";

describe("case-switch.ts", () => {
  describe("pascalCase", () => {
    test("should convert string to PascalCase", () => {
      expect(pascalCase("mock_string_one")).toBe("MockStringOne");
      expect(pascalCase("mockStringTwo")).toBe("MockStringTwo");
    });
  });

  describe("camelArray", () => {
    test("should only convert objects", () => {
      // @ts-ignore
      expect(camelArray("string")).toBe("string");
    });

    test("should convert object keys to camelCase", () => {
      expect(camelArray(["camelCase", "snake_case", "PascalCase"])).toMatchSnapshot();
    });
  });

  describe("camelKeys", () => {
    test("should only convert objects", () => {
      const string = "string";
      // @ts-ignore
      expect(camelKeys(string)).toBe(string);

      const error = new Error("error");
      expect(camelKeys(error)).toStrictEqual(error);

      const date = new Date();
      expect(camelKeys(date)).toStrictEqual(date);

      const array: Array<string> = ["array"];
      // @ts-ignore
      expect(camelKeys(array)).toStrictEqual(array);
    });

    test("should convert object keys to camelCase", () => {
      expect(
        camelKeys({
          snake_one: "one",
          snake_two: 2,
          snake_three: true,
          camelOne: ["mock"],
        }),
      ).toMatchSnapshot();
    });

    test("should convert objects within objects to camelCase", () => {
      expect(
        camelKeys({
          snake_one: "one",
          snake_two: {
            object_one: 1,
            object_two: "two",
            nested_object: {
              nested_one: "one",
              nested_two: ["array"],
            },
          },
        }),
      ).toMatchSnapshot();
    });
  });

  describe("snakeArray", () => {
    test("should convert object keys to snake_case", () => {
      expect(snakeArray(["camelCase", "snake_case", "PascalCase"])).toMatchSnapshot();
    });
  });

  describe("snakeKeys", () => {
    test("should convert object keys to snake_case", () => {
      expect(
        snakeKeys({
          camelOne: "one",
          camelTwo: 2,
          snake_one: "mock",
        }),
      ).toMatchSnapshot();
    });
  });

  describe("pascalArray", () => {
    test("should convert object keys to PascalCase", () => {
      expect(pascalArray(["camelCase", "snake_case", "PascalCase"])).toMatchSnapshot();
    });
  });

  describe("pascalKeys", () => {
    test("should convert object keys to PascalCase", () => {
      expect(
        pascalKeys({
          camelOne: "one",
          snake_one: "one",
        }),
      ).toMatchSnapshot();
    });
  });
});
