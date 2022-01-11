import { User } from "./user.model";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export class SignUpInfo implements LoginCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(info: SignUpInfo) {
    this.firstName = info.firstName;
    this.lastName = info.lastName;
    this.email = info.email;
    this.password = info.password;
  }
}
