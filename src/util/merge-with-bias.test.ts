import { mergeObjectsWithBias } from "./merge-with-bias";

describe("mergeObjectsWithBias", () => {
  test("should prioritize primary input", () => {
    expect(
      mergeObjectsWithBias(
        { a: "primary", b: null, c: "primary", d: undefined, e: undefined },
        { a: "secondary", b: "secondary", c: null, d: null, e: 12345 },
      ),
    ).toMatchSnapshot();
  });
});
