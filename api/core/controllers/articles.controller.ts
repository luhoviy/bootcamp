import express from "express";
import articlesService from "../services/articles.service";
import { StatusCode } from "../common/enums";
import { UserJwtPayload } from "../dto/user.dto";
import { InternalError } from "../common/error-handler";

class ArticlesController {
  async getAll(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const list = await articlesService.getAll(req.query);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const article = await articlesService.getOne(id);
      res.json(article);
    } catch (error) {
      next(InternalError.NotFound(`Article with id ${id} not found`));
    }
  }

  async create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const user: UserJwtPayload = req["user"];
    try {
      const article = await articlesService.create(req.body, user);
      res.status(StatusCode.CREATED).json(article);
    } catch (error) {
      next(error);
    }
  }

  async update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const user: UserJwtPayload = req["user"];
    const { id } = req.params;
    try {
      const article = await articlesService.update(id, req.body, user);
      res.json(article);
    } catch (error) {
      next(error);
    }
  }

  async deleteOne(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      await articlesService.deleteOne(id);
      res.sendStatus(StatusCode.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async likeArticle(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const { articleID } = req.query;
      const user: UserJwtPayload = req["user"];
      const response = await articlesService.likeArticle(articleID as string, user);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async dislikeArticle(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { articleID } = req.query;
      const user: UserJwtPayload = req["user"];
      const response = await articlesService.dislikeArticle(articleID as string, user);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new ArticlesController();
