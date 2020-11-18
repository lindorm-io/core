import { NodeEnvironment } from "../enum";
import { Configuration, IConfigurationBase, IConfigurationOptions } from "./Configuration";

interface IMockConfiguration extends IConfigurationBase {
  SERVER_PORT: number;
  HOST: string;
  PRIO: string;
}

class MockConfig extends Configuration<IMockConfiguration> {
  constructor(options: IConfigurationOptions) {
    super(options);
  }
}

describe("Configuration", () => {
  let config: MockConfig;

  let environmentConfig: IMockConfiguration;
  let productionConfig: IMockConfiguration;
  let stagingConfig: IMockConfiguration;
  let developmentConfig: IMockConfiguration;
  let testConfig: IMockConfiguration;

  beforeAll(() => {
    environmentConfig = {
      NODE_ENVIRONMENT: null,
      SERVER_PORT: null,
      HOST: null,
      PRIO: "recognized",
    };
    productionConfig = {
      NODE_ENVIRONMENT: NodeEnvironment.PRODUCTION,
      SERVER_PORT: 2345,
      HOST: "https://lindorm.io/",
      PRIO: "ignored",
    };
    stagingConfig = {
      NODE_ENVIRONMENT: NodeEnvironment.STAGING,
      SERVER_PORT: 3456,
      HOST: "https://staging.lindorm.io/",
      PRIO: "ignored",
    };
    developmentConfig = {
      NODE_ENVIRONMENT: NodeEnvironment.DEVELOPMENT,
      SERVER_PORT: 1234,
      HOST: "https://dev.lindorm.io/",
      PRIO: "ignored",
    };
    testConfig = {
      NODE_ENVIRONMENT: NodeEnvironment.TEST,
      SERVER_PORT: 4567,
      HOST: "https://test.lindorm.io/",
      PRIO: "ignored",
    };
    config = new MockConfig({
      environment: environmentConfig,
      production: productionConfig,
      staging: stagingConfig,
      development: developmentConfig,
      test: testConfig,
    });
  });

  test("should provide configuration for production", () => {
    expect(config.get(NodeEnvironment.PRODUCTION)).toMatchSnapshot();
  });

  test("should provide configuration for staging", () => {
    expect(config.get(NodeEnvironment.STAGING)).toMatchSnapshot();
  });

  test("should provide configuration for development", () => {
    expect(config.get(NodeEnvironment.DEVELOPMENT)).toMatchSnapshot();
  });

  test("should provide configuration for test", () => {
    expect(config.get(NodeEnvironment.TEST)).toMatchSnapshot();
  });
});
