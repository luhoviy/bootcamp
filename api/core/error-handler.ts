import express from "express";

export function ErrorHandler(
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  res.status(500).json({
    message: error?.message || error || "Something went wrong...",
    code: 500
  });
}
