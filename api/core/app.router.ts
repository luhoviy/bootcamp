import express from "express";
import { ArticlesRouter } from "./routers/articles.router";
import { StatusCode } from "./common/enums";
import { InternalError } from "./common/error-handler";
import { AuthRouter } from "./routers/auth.router";
import { UsersRouter } from "./routers/users.router";

export const AppRouter = express.Router();

AppRouter.use("/articles", ArticlesRouter);
AppRouter.use("/auth", AuthRouter);
AppRouter.use("/users", UsersRouter);

AppRouter.use("*", (req, res, next: express.NextFunction) => {
  next(new InternalError("Not Found", StatusCode.NOT_FOUND));
});
