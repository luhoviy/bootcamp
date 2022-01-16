import express from "express";
import controller from "../controllers/tags.controller";
import {
  RequestBodyValidator,
  validateQueryParams,
  validateRequestBody
} from "../middlewares/validators.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { Role } from "../common/enums";

export const TagsRouter = express.Router();

TagsRouter.get("/", controller.getAll);
TagsRouter.post(
  "/add",
  [RoleMiddleware(Role.ADMIN), RequestBodyValidator.notEmpty("text"), validateRequestBody],
  controller.add
);
TagsRouter.put(
  "/update",
  [
    RoleMiddleware(Role.ADMIN),
    RequestBodyValidator.notEmpty("text"),
    RequestBodyValidator.notEmpty("_id"),
    validateRequestBody
  ],
  controller.update
);
TagsRouter.delete("/", validateQueryParams("tagId"), controller.delete);
