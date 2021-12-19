import express from "express";
import { StatusCode } from "./enums";

export function ErrorHandler(
  error: InternalError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  res.status(error?.code || StatusCode.INTERNAL_ERROR).json({
    message: error?.message || "Something went wrong...",
    code: error?.code || StatusCode.INTERNAL_ERROR
  });
}

export class InternalError {
  constructor(public message: string, public code: number = StatusCode.INTERNAL_ERROR) {}
}
