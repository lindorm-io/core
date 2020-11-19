import { mergeObjectsWithBias } from "../util/merge-with-bias";
import { switchOnEnvironment } from "../util/switch-on-environment";

export interface IConfigurationDataBase {
  NODE_ENVIRONMENT: string;
}

export interface IConfigurationOptions<IConfigurationData extends IConfigurationDataBase> {
  productionConfig: IConfigurationData;
  stagingConfig: IConfigurationData;
  developmentConfig: IConfigurationData;

  environmentConfig: IConfigurationData;
  testConfig: IConfigurationData;
}

export abstract class ConfigurationBase<IConfigurationData extends IConfigurationDataBase> {
  private productionConfig: IConfigurationDataBase;
  private stagingConfig: IConfigurationDataBase;
  private developmentConfig: IConfigurationDataBase;

  private environmentConfig: IConfigurationDataBase;
  private testConfig: IConfigurationDataBase;

  protected constructor(options: IConfigurationOptions<IConfigurationData>) {
    this.productionConfig = options.productionConfig;
    this.stagingConfig = options.stagingConfig;
    this.developmentConfig = options.developmentConfig;

    this.environmentConfig = options.environmentConfig;
    this.testConfig = options.testConfig;
  }

  public get(environment: string): IConfigurationData {
    const data: unknown = mergeObjectsWithBias(
      this.environmentConfig,
      switchOnEnvironment(environment, {
        production: this.productionConfig,
        staging: this.stagingConfig,
        development: this.developmentConfig,
        test: this.testConfig,
      }),
    );
    return data as IConfigurationData;
  }
}
