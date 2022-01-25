import { Role } from "../enums";

export class User {
  _id: string;
  email: string;
  roles: Role[];
  firstName: string;
  lastName: string;
  displayName: string;

  constructor(user: User) {
    this._id = user._id;
    this.email = user.email;
    this.roles = user.roles;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.displayName = user.displayName;
  }
}
