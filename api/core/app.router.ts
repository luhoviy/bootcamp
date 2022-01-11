import express from "express";
import { ArticlesRouter } from "./routers/articles.router";
import { Role, StatusCode } from "./common/enums";
import { InternalError } from "./common/error-handler";
import { AuthRouter } from "./routers/auth.router";
import { UsersRouter } from "./routers/users.router";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { RoleMiddleware } from "./middlewares/role.middleware";

export const AppRouter = express.Router();

AppRouter.use("/articles", AuthMiddleware, ArticlesRouter);
AppRouter.use("/auth", AuthRouter);
AppRouter.use("/users", [AuthMiddleware, RoleMiddleware(Role.ADMIN)], UsersRouter);

AppRouter.use("*", (req, res, next: express.NextFunction) => {
  next(new InternalError("Not Found", StatusCode.NOT_FOUND));
});
