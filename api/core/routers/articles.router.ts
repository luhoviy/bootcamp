import express from "express";
import controller from "../controllers/articles.controller";
import { validateQueryParams } from "../middlewares/validators.middleware";

export const ArticlesRouter = express.Router();

ArticlesRouter.get("/", controller.getAll);
ArticlesRouter.get("/:id", controller.getOne);
ArticlesRouter.post("/", controller.create);
ArticlesRouter.delete("/:id", controller.deleteOne);
ArticlesRouter.patch("/like", validateQueryParams("articleID"), controller.likeArticle);
ArticlesRouter.patch("/dislike", validateQueryParams("articleID"), controller.dislikeArticle);
ArticlesRouter.post("/:id/tag", validateQueryParams("tag"), controller.addTag);
ArticlesRouter.delete("/:id/tag", validateQueryParams("tag"), controller.removeTag);
