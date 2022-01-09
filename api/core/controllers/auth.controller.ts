import express from "express";
import authService from "../services/auth.service";
import { validationResult } from "express-validator";
import { StatusCode } from "../common/enums";
import { handleInvalidBodyRequest } from "../common/error-handler";
import { transformDaysToMilliseconds } from "../common/utils";

class AuthController {
  async signup(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        handleInvalidBodyRequest(res, errors);
        return;
      }
      const userData = await authService.signup(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: transformDaysToMilliseconds(30),
        httpOnly: true
      });
      res.status(StatusCode.CREATED).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        handleInvalidBodyRequest(res, errors);
        return;
      }
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: transformDaysToMilliseconds(30),
        httpOnly: true
      });
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: transformDaysToMilliseconds(30),
        httpOnly: true
      });
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
