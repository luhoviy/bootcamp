import { User } from "../models/user.model";

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {
  user: User.getMockedUser(),
};
