import express from "express";
import { isEmpty } from "lodash";
import { InternalError } from "../common/error-handler";
import TokenService from "../services/token.service";

export function AuthMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    if (isEmpty(authHeader)) {
      return next(InternalError.Unauthorized());
    }

    const accessToken = authHeader.split(" ")[1];
    if (isEmpty(accessToken)) {
      return next(InternalError.Unauthorized());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (isEmpty(userData)) {
      return next(InternalError.Unauthorized());
    }

    req["user"] = userData;
    next();
  } catch (e) {
    next(InternalError.Unauthorized());
  }
}
