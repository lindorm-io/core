import { APIError } from "../error";
import { HttpStatus } from "../constant";

export interface IGetAuthorizationHeaderData {
  type: string;
  value: string;
}

export const getAuthorizationHeader = (header: string): IGetAuthorizationHeaderData => {
  if (!header) {
    throw new APIError("Missing Authorization Header", {
      statusCode: HttpStatus.ClientError.BAD_REQUEST,
    });
  }

  const split = header.split(" ");

  if (split.length !== 2) {
    throw new APIError("Invalid Authorization Header length", {
      debug: { header },
      details: "The Authorization header should include two strings",
      statusCode: HttpStatus.ClientError.BAD_REQUEST,
    });
  }

  const type = split[0];
  const value = split[1];

  switch (type) {
    case "Basic":
    case "Bearer":
      break;

    default:
      throw new APIError("Invalid Authorization Header type", {
        debug: { type },
        statusCode: HttpStatus.ClientError.BAD_REQUEST,
      });
  }

  return { type, value };
};
