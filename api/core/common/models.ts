import { UserDTO } from "../dto/user.dto";
import { SortOrder } from "./enums";

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends JwtTokens {
  user: UserDTO;
}

export class SortOptions {
  sortBy: string;
  order: SortOrder;

  constructor(sortBy = "createdAt", order: SortOrder = SortOrder.DESC) {
    this.sortBy = sortBy;
    this.order = order;
  }
}
