import express from "express";
import controller from "../controllers/users.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export const UsersRouter = express.Router();

UsersRouter.get("/", [AuthMiddleware], controller.getAll);
