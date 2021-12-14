import express from "express";
import controller from "../controllers/articles.controller.js";

export const articlesRouter = express.Router();

articlesRouter.get("/", controller.getAll);
