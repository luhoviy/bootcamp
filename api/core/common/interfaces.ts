import { UserDTO } from "../dto/user.dto";

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends JwtTokens {
  user: UserDTO;
}
