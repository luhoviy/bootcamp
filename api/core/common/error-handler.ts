import express from "express";
import { StatusCode } from "./enums";
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

  static NotFound(message: string = "Not found") {
    return new InternalError(message, StatusCode.NOT_FOUND);
  }

  static Forbidden(message = "Access denied") {
    return new InternalError(message, StatusCode.FORBIDDEN);
  }
}
