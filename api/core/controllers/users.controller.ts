import express from "express";
import UsersService from "../services/users.service";

class UsersController {
  async getAll(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      res.json(await UsersService.getAll());
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
