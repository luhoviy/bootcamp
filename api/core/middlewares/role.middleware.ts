import express from "express";
import { InternalError } from "../common/error-handler";
import { Role } from "../common/enums";
import { intersection, isEmpty } from "lodash";
import TokenService from "../services/token.service";

export function RoleMiddleware(requiredRoles: Role | Role[]) {
  requiredRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      if (isEmpty(accessToken)) {
        return next(InternalError.Unauthorized());
      }

      const { roles } = TokenService.validateAccessToken(accessToken);
      if (!intersection(roles, requiredRoles).length && !roles.includes(Role.ADMIN)) {
        return next(InternalError.Forbidden());
      }

      next();
    } catch (e) {
      next(InternalError.Forbidden());
    }
  };
}
