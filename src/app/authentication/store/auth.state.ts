import { User } from "../../shared/models/user.model";
import { HttpErrorResponse } from "@angular/common/http";

export interface AuthState {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: User;
  readonly error: HttpErrorResponse;
}

export const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  error: null
};
