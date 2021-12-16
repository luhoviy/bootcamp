import articlesService from "../services/articles.service";
import express from "express";

class ArticlesController {
  getAll(req: express.Request, res: express.Response): void {
    res.json(articlesService.getAll());
  }
}

export default new ArticlesController();
