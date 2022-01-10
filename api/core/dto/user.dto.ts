import { Role } from "../common/enums";

export class UserJwtPayload {
  _id: string;
  email: string;
  roles: Role[];

  constructor(user: UserDTO) {
    this._id = user._id;
    this.email = user.email;
    this.roles = user.roles;
  }
}

export class UserDTO extends UserJwtPayload {
  firstName: string;
  lastName: string;
  displayName: string;
  password?: string;

  constructor(user: UserDTO) {
    super(user);
    this.firstName = this.displayName = user.firstName;
    this.lastName = user.lastName;
    this.displayName = !!this.lastName ? this.displayName + " " + this.lastName : this.displayName;
  }
}
