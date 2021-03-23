import { APIError } from "@lindorm-io/errors";
import { HttpStatus } from "../constant";

export class MissingAuthorizationHeaderError extends APIError {
  constructor() {
    super("Missing Authorization Header", {
      statusCode: HttpStatus.ClientError.BAD_REQUEST,
    });
  }
}
