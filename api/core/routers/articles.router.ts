import express from "express";
import controller from "../controllers/articles.controller";

export const ArticlesRouter = express.Router();

ArticlesRouter.get("/", controller.getAll);
