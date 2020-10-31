import { ExtendableError, IExtendableErrorOptions } from "./ExtendableError";

export interface IAPIErrorOptions extends IExtendableErrorOptions {
  statusCode?: number;
  title?: string;
}

export class APIError extends ExtendableError {
  readonly statusCode: number;
  readonly title: string;

  constructor(message: string, options?: IAPIErrorOptions) {
    super(message, options);
    this.statusCode = options?.statusCode || 500;
    this.title = options?.title || null;
  }
}
