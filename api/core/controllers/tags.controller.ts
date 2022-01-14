import express from "express";
import { StatusCode } from "../common/enums";
import TagsService from "../services/tags.service";
import { InternalError } from "../common/error-handler";

class TagsController {
  async getAll(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const tags = await TagsService.getAll();
      res.json(tags);
    } catch (error) {
      next(error);
    }
  }

  async add(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { text } = req.body;
    try {
      const comment = await TagsService.add(text);
      res.status(StatusCode.CREATED).json(comment);
    } catch (error) {
      if (error?.code === 11000) {
        return next(InternalError.BadRequest("This tag already exists."));
      }
      next(error);
    }
  }

  async update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { _id, text } = req.body;
    try {
      const comment = await TagsService.update(_id, text);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { tagId } = req.query;
    try {
      await TagsService.delete(tagId as string);
      res.sendStatus(StatusCode.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new TagsController();
