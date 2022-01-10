import express from "express";
import controller from "../controllers/users.controller";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { Role } from "../common/enums";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export const UsersRouter = express.Router();

UsersRouter.get("/", [AuthMiddleware, RoleMiddleware(Role.ADMIN)], controller.getAll);
