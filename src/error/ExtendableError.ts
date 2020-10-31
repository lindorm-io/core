import { isFunction } from "lodash";
import { TObject } from "../typing";

export interface IExtendableErrorOptions {
  debug?: TObject<any>;
  details?: string;
  errorCode?: string;
}

export abstract class ExtendableError extends Error {
  readonly debug: TObject<any>;
  readonly details: string;
  readonly errorCode: string;

  protected constructor(message: string, options?: IExtendableErrorOptions) {
    super(message);

    this.name = this.constructor.name;
    this.debug = options?.debug || {};
    this.details = options?.details || null;
    this.errorCode = options?.errorCode || null;

    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
