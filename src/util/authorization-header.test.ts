import { getAuthorizationHeader } from "./authorization-header";

describe("authorization-header.ts", () => {
  test("should return an object with Basic type and value", () => {
    expect(getAuthorizationHeader("Basic mock-value-string")).toStrictEqual({
      type: "Basic",
      value: "mock-value-string",
    });
  });

  test("should return an object with Bearer type and value", () => {
    expect(getAuthorizationHeader("Bearer mock-value-string")).toStrictEqual({
      type: "Bearer",
      value: "mock-value-string",
    });
  });

  test("should throw an error when header is unavailable", () => {
    expect(() => getAuthorizationHeader(null)).toThrow(
      expect.objectContaining({ message: "Missing Authorization Header" }),
    );
  });

  test("should throw an error when header is too short", () => {
    expect(() => getAuthorizationHeader("one")).toThrow(
      expect.objectContaining({ message: "Invalid Authorization Header length" }),
    );
  });

  test("should throw an error when header is too long", () => {
    expect(() => getAuthorizationHeader("one two three")).toThrow(
      expect.objectContaining({ message: "Invalid Authorization Header length" }),
    );
  });

  test("should throw an error when header type is unexpected", () => {
    expect(() => getAuthorizationHeader("one two")).toThrow(
      expect.objectContaining({ message: "Invalid Authorization Header type" }),
    );
  });
});
