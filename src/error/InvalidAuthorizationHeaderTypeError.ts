import { APIError } from "@lindorm-io/errors";
import { HttpStatus } from "../constant";

export class InvalidAuthorizationHeaderTypeError extends APIError {
  constructor(type: string) {
    super("Invalid Authorization Header type", {
      debug: { type },
      statusCode: HttpStatus.ClientError.BAD_REQUEST,
    });
  }
}