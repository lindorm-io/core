import { IEnvironmentObjects, switchOnEnvironment } from "./switch-on-environment";
import { NodeEnvironment } from "../enum";

describe("switchConfiguration", () => {
  const objects: IEnvironmentObjects = {
    production: { production: true },
    staging: { staging: true },
    development: { development: true },
    test: { test: true },
  };

  test("should return PRODUCTION object", () => {
    expect(switchOnEnvironment(NodeEnvironment.PRODUCTION, objects)).toMatchSnapshot();
  });

  test("should return STAGING object", () => {
    expect(switchOnEnvironment(NodeEnvironment.STAGING, objects)).toMatchSnapshot();
  });

  test("should return DEVELOPMENT object", () => {
    expect(switchOnEnvironment(NodeEnvironment.DEVELOPMENT, objects)).toMatchSnapshot();
  });

  test("should return TEST object", () => {
    expect(switchOnEnvironment(NodeEnvironment.TEST, objects)).toMatchSnapshot();
  });
});
