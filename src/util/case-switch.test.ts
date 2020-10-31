import { pascalCase, camelArray, camelKeys, pascalArray, pascalKeys, snakeArray, snakeKeys } from "./case-switch";

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
      expect(camelArray(["camelCase", "snake_case", "PascalCase"])).toStrictEqual([
        "camelCase",
        "snakeCase",
        "pascalCase",
      ]);
    });
  });

  describe("camelKeys", () => {
    test("should only convert objects", () => {
      // @ts-ignore
      expect(camelKeys("string")).toBe("string");
    });

    test("should convert object keys to camelCase", () => {
      expect(
        camelKeys({
          snake_one: "one",
          snake_two: 2,
          snake_three: true,
          camelOne: ["mock"],
        }),
      ).toStrictEqual({
        snakeOne: "one",
        snakeTwo: 2,
        snakeThree: true,
        camelOne: ["mock"],
      });
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
      ).toStrictEqual({
        snakeOne: "one",
        snakeTwo: {
          objectOne: 1,
          objectTwo: "two",
          nestedObject: {
            nestedOne: "one",
            nestedTwo: ["array"],
          },
        },
      });
    });
  });

  describe("snakeArray", () => {
    test("should convert object keys to snake_case", () => {
      expect(snakeArray(["camelCase", "snake_case", "PascalCase"])).toStrictEqual([
        "camel_case",
        "snake_case",
        "pascal_case",
      ]);
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
      ).toStrictEqual({
        camel_one: "one",
        camel_two: 2,
        snake_one: "mock",
      });
    });
  });

  describe("pascalArray", () => {
    test("should convert object keys to PascalCase", () => {
      expect(pascalArray(["camelCase", "snake_case", "PascalCase"])).toStrictEqual([
        "CamelCase",
        "SnakeCase",
        "PascalCase",
      ]);
    });
  });

  describe("pascalKeys", () => {
    test("should convert object keys to PascalCase", () => {
      expect(
        pascalKeys({
          camelOne: "one",
          snake_one: "one",
        }),
      ).toStrictEqual({
        CamelOne: "one",
        SnakeOne: "one",
      });
    });
  });
});
