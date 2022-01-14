import express from "express";
import controller from "../controllers/auth.controller";
import { RequestBodyValidator, validateBodyRequest } from "../middlewares/validators.middleware";

export const AuthRouter = express.Router();

AuthRouter.post(
  "/signup",
  [...RequestBodyValidator.buildSignUpValidators(), validateBodyRequest],
  controller.signup
);
AuthRouter.post(
  "/login",
  [...RequestBodyValidator.buildCredentialsValidators(), validateBodyRequest],
  controller.login
);
AuthRouter.post("/logout", controller.logout);
AuthRouter.get("/refresh", controller.refresh);
