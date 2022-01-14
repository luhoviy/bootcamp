import { UserJwtPayload } from "../dto/user.dto";
import { Role } from "./enums";

export const transformDaysToMilliseconds = (days: number): number => {
  return days * 24 * 60 * 60 * 1000;
};

export const isAdmin = (user: UserJwtPayload): boolean => {
  try {
    return user.roles.includes(Role.ADMIN);
  } catch (e) {
    return false;
  }
};
