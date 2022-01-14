import { check, ValidationChain, validationResult } from "express-validator";
import express from "express";
import { StatusCode } from "../common/enums";
import { InternalError } from "../common/error-handler";
import { isEmpty } from "lodash";

export class RequestBodyValidator {
  static validateByMinLength(fieldName: string, min: number): ValidationChain {
    return check(fieldName, `Should contain at least ${min} symbols`).isLength({ min });
  }

  static validateByMaxLength(fieldName: string, max: number): ValidationChain {
    return check(fieldName, `Max ${max} symbols`).isLength({ max });
  }

  static isEmail(fieldName = "email"): ValidationChain {
    return check(fieldName, "Email address is missing or invalid").isEmail();
  }

  static notEmpty(fieldName: string): ValidationChain {
    return check(fieldName, `Required field is missing or invalid`).notEmpty();
  }

  static buildCredentialsValidators(): ValidationChain[] {
    return [
      RequestBodyValidator.isEmail(),
      RequestBodyValidator.validateByMinLength("password", 6),
      RequestBodyValidator.validateByMaxLength("password", 32)
    ];
  }

  static buildSignUpValidators(): ValidationChain[] {
    return [
      ...RequestBodyValidator.buildCredentialsValidators(),
      RequestBodyValidator.validateByMinLength("firstName", 2)
    ];
  }
}

export function validateBodyRequest(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.array().map((err) => ({
      message: err.msg,
      field: err.param
    }));
    res
      .status(StatusCode.BAD_REQUEST)
      .json(InternalError.BadRequest("Invalid request body provided.", mappedErrors));
    return;
  }
  next();
}

export function validateQueryParams(requiredParams: string[] | string) {
  requiredParams = Array.isArray(requiredParams) ? requiredParams : [requiredParams];
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const invalidParams: string[] = [];
    (requiredParams as string[]).forEach((param) => {
      if (isEmpty(req.query[param])) {
        invalidParams.push(param);
      }
      if (invalidParams.length) {
        res
          .status(StatusCode.BAD_REQUEST)
          .json(
            InternalError.BadRequest(`Required param(s): ${invalidParams.join(",")} are missing or invalid.`)
          );
        return;
      }
      next();
    });
  };
}
