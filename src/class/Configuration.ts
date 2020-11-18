import { mergeObjectsWithBias } from "../util/merge-with-bias";
import { switchOnEnvironment } from "../util/switch-on-environment";

export interface IConfigurationBase {
  NODE_ENVIRONMENT: string;
}

export interface IConfigurationOptions {
  production: IConfigurationBase;
  staging: IConfigurationBase;
  development: IConfigurationBase;

  environment: IConfigurationBase;
  test: IConfigurationBase;
}

export abstract class Configuration<Interface extends IConfigurationBase> {
  private production: IConfigurationBase;
  private staging: IConfigurationBase;
  private development: IConfigurationBase;

  private environment: IConfigurationBase;
  private test: IConfigurationBase;

  protected constructor(options: IConfigurationOptions) {
    this.production = options.production;
    this.staging = options.staging;
    this.development = options.development;

    this.environment = options.environment;
    this.test = options.test;
  }

  public get(environment: string): IConfigurationBase {
    const data: unknown = mergeObjectsWithBias(
      this.environment,
      switchOnEnvironment(environment, {
        production: this.production,
        staging: this.staging,
        development: this.development,
        test: this.test,
      }),
    );
    return data as IConfigurationBase;
  }
}
