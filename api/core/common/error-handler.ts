import express from "express";
import { StatusCode } from "./enums";
import { Result, ValidationError } from "express-validator";
import { isEmpty } from "lodash";

export function ErrorHandlerMiddleware(
  error: InternalError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const responseError = {
    message: error?.message || "Internal server error",
    code: error?.code || StatusCode.INTERNAL_ERROR,
    errors: error?.errors || []
  };
  if (isEmpty(responseError.errors)) {
    delete responseError.errors;
  }
  res.status(responseError.code).json(responseError);
}

export class InternalError {
  constructor(
    public message: string,
    public code: number = StatusCode.INTERNAL_ERROR,
    public errors: any[] = []
  ) {}

  static Unauthorized() {
    return new InternalError("Not Authorized", StatusCode.UNAUTHORIZED);
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new InternalError(message, StatusCode.BAD_REQUEST, errors);
  }

  static NotFound(message: string) {
    return new InternalError(message, StatusCode.NOT_FOUND);
  }
}

export function handleInvalidBodyRequest(res: express.Response, errors: Result<ValidationError>): void {
  const mappedErrors = errors.array().map((err) => ({
    message: err.msg,
    field: err.param
  }));
  res
    .status(StatusCode.BAD_REQUEST)
    .json(InternalError.BadRequest("Invalid request body provided.", mappedErrors));
}
