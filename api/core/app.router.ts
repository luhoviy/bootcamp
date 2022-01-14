import express from "express";
import { ArticlesRouter } from "./routers/articles.router";
import { Role, StatusCode } from "./common/enums";
import { InternalError } from "./common/error-handler";
import { AuthRouter } from "./routers/auth.router";
import { UsersRouter } from "./routers/users.router";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { RoleMiddleware } from "./middlewares/role.middleware";
import { CommentsRouter } from "./routers/comments.router";
import { TagsRouter } from "./routers/tags.router";

export const AppRouter = express.Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/users", [AuthMiddleware, RoleMiddleware(Role.ADMIN)], UsersRouter);
AppRouter.use("/articles", AuthMiddleware, ArticlesRouter);
AppRouter.use("/comments", AuthMiddleware, CommentsRouter);
AppRouter.use("/tags", [AuthMiddleware], TagsRouter);

AppRouter.use("*", (req, res, next: express.NextFunction) => {
  next(new InternalError("Not Found", StatusCode.NOT_FOUND));
});
