import { APIError } from "@lindorm-io/errors";
import { HttpStatus } from "../constant";

export class InvalidAuthorizationHeaderLengthError extends APIError {
  constructor(header: string) {
    super("Invalid Authorization Header Length", {
      debug: { header },
      details: "The Authorization header should include two strings",
      statusCode: HttpStatus.ClientError.BAD_REQUEST,
    });
  }
}
