import express from "express";
import controller from "../controllers/comments.controller";
import {
  RequestBodyValidator,
  validateQueryParams,
  validateRequestBody
} from "../middlewares/validators.middleware";

export const CommentsRouter = express.Router();

CommentsRouter.post(
  "/",
  [RequestBodyValidator.notEmpty("text"), RequestBodyValidator.notEmpty("articleID"), validateRequestBody],
  controller.add
);
CommentsRouter.put(
  "/",
  [RequestBodyValidator.notEmpty("text"), RequestBodyValidator.notEmpty("_id"), validateRequestBody],
  controller.update
);
CommentsRouter.delete("/", validateQueryParams("commentID"), controller.delete);
