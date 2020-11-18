import { NodeEnvironment } from "../enum";
import { TObject } from "../typing";

export interface IEnvironmentObjects {
  production: TObject<any>;
  staging: TObject<any>;
  development: TObject<any>;
  test: TObject<any>;
}

export const switchOnEnvironment = (environment: string, objects: IEnvironmentObjects): TObject<any> => {
  switch (environment) {
    case NodeEnvironment.PRODUCTION:
      return objects.production;

    case NodeEnvironment.STAGING:
      return objects.staging;

    case NodeEnvironment.DEVELOPMENT:
      return objects.development;

    case NodeEnvironment.TEST:
      return objects.test;

    default:
      return {};
  }
};
