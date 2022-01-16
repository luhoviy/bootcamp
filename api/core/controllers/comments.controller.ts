import express from "express";
import { UserJwtPayload } from "../dto/user.dto";
import { StatusCode } from "../common/enums";
import CommentsService from "../services/comments.service";

class CommentsController {
  async add(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const user: UserJwtPayload = req["user"];
    const { articleID, text } = req.body;
    try {
      const comment = await CommentsService.add(text, articleID, user);
      res.status(StatusCode.CREATED).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const user: UserJwtPayload = req["user"];
    const { _id, text } = req.body;
    try {
      const comment = await CommentsService.update(_id, text, user);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const user: UserJwtPayload = req["user"];
    const { commentID } = req.query;
    try {
      await CommentsService.delete(commentID as string, user);
      res.sendStatus(StatusCode.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentsController();
