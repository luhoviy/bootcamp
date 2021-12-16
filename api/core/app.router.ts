import express from "express";
import { ArticlesRouter } from "./routers/articles.router";

export const AppRouter = express.Router();

AppRouter.use("/articles", ArticlesRouter);

AppRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "Not found",
    code: 404
  });
});
