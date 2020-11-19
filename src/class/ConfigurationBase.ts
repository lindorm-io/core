import { mergeObjectsWithBias } from "../util/merge-with-bias";
import { switchOnEnvironment } from "../util/switch-on-environment";

export interface IConfigurationBase {
  NODE_ENVIRONMENT: string;
}

export interface IConfigurationOptions<Interface extends IConfigurationBase> {
  productionConfig: Interface;
  stagingConfig: Interface;
  developmentConfig: Interface;

  environmentConfig: Interface;
  testConfig: Interface;
}

export abstract class ConfigurationBase<Interface extends IConfigurationBase> {
  private productionConfig: IConfigurationBase;
  private stagingConfig: IConfigurationBase;
  private developmentConfig: IConfigurationBase;

  private environmentConfig: IConfigurationBase;
  private testConfig: IConfigurationBase;

  protected constructor(options: IConfigurationOptions<Interface>) {
    this.productionConfig = options.productionConfig;
    this.stagingConfig = options.stagingConfig;
    this.developmentConfig = options.developmentConfig;

    this.environmentConfig = options.environmentConfig;
    this.testConfig = options.testConfig;
  }

  public get(environment: string): Interface {
    const data: unknown = mergeObjectsWithBias(
      this.environmentConfig,
      switchOnEnvironment(environment, {
        production: this.productionConfig,
        staging: this.stagingConfig,
        development: this.developmentConfig,
        test: this.testConfig,
      }),
    );
    return data as Interface;
  }
}
