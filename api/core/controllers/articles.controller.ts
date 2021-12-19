import express from "express";
import articlesService from "../services/articles.service";
import { StatusCode } from "../common/enums";

class ArticlesController {
  async getAll(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      res.json(await articlesService.getAll());
    } catch (error) {
      next(error);
    }
  }

  async create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      res.status(StatusCode.CREATED).json(await articlesService.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  async deleteOne(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      res.json(await articlesService.deleteOne(id));
    } catch (error) {
      next(error);
    }
  }
}

export default new ArticlesController();
