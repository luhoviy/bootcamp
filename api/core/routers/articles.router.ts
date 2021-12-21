import express from "express";
import controller from "../controllers/articles.controller";

export const ArticlesRouter = express.Router();

ArticlesRouter.get("/", controller.getAll);
ArticlesRouter.post("/", controller.create);
ArticlesRouter.delete("/:id", controller.deleteOne);
ArticlesRouter.patch("/like", controller.likeArticle);
ArticlesRouter.patch("/dislike", controller.dislikeArticle);
