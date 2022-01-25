import express from "express";
import controller from "../controllers/articles.controller";
import { RequestBodyValidator, validateQueryParams } from "../middlewares/validators.middleware";

export const ArticlesRouter = express.Router();

ArticlesRouter.get("/", controller.getAll);
ArticlesRouter.get("/:id", controller.getOne);
ArticlesRouter.post("/", RequestBodyValidator.buildArticleValidators(), controller.create);
ArticlesRouter.put("/:id", RequestBodyValidator.buildArticleValidators(), controller.update);
ArticlesRouter.delete("/:id", controller.deleteOne);
ArticlesRouter.patch("/like", validateQueryParams("articleID"), controller.likeArticle);
ArticlesRouter.patch("/dislike", validateQueryParams("articleID"), controller.dislikeArticle);
