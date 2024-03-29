import express from "express";
import controller from "../controllers/auth.controller";
import { RequestBodyValidator, validateRequestBody } from "../middlewares/validators.middleware";

export const AuthRouter = express.Router();

AuthRouter.post("/signup", RequestBodyValidator.buildSignUpValidators(), controller.signup);
AuthRouter.post(
  "/login",
  [...RequestBodyValidator.buildCredentialsValidators(), validateRequestBody],
  controller.login
);
AuthRouter.post("/logout", controller.logout);
AuthRouter.get("/refresh", controller.refresh);
