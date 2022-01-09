import { check, ValidationChain } from "express-validator";

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
