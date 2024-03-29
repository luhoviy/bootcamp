import { UserDTO, UserJwtPayload } from "../dto/user.dto";
import { UserModel } from "../models/user.model";
import { InternalError } from "../common/error-handler";
import { Role, StatusCode } from "../common/enums";
import { compare, hash } from "bcrypt";
import TokenService from "./token.service";
import { AuthResponse } from "../common/models";
import { isEmpty } from "lodash";
import { RoleModel } from "../models/role.model";

class AuthService {
  private static async saveTokenAndBuildAuthResponse(user: UserDTO): Promise<AuthResponse> {
    const tokens = TokenService.generateTokens({ ...new UserJwtPayload(user) });
    await TokenService.saveRefreshToken(user._id, tokens.refreshToken);
    return {
      ...tokens,
      user: new UserDTO(user)
    };
  }

  async signup(user: UserDTO): Promise<AuthResponse> {
    const candidate = await UserModel.findOne({ email: user.email });
    if (candidate) {
      throw new InternalError(`User with email ${user.email} already exists!`, StatusCode.CONFLICT);
    }
    const hashPassword = await hash(user.password, 5);
    const userRole = await RoleModel.findOne({ type: Role.USER });
    const userDto = await UserModel.create({
      ...new UserDTO(user),
      password: hashPassword,
      roles: [userRole.type]
    });
    return AuthService.saveTokenAndBuildAuthResponse(userDto);
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw InternalError.NotFound("User not found");
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw InternalError.Forbidden("Incorrect password");
    }
    return AuthService.saveTokenAndBuildAuthResponse(user);
  }

  async logout(refreshToken: string): Promise<void> {
    if (isEmpty(refreshToken)) {
      throw InternalError.Unauthorized();
    }
    return TokenService.removeRefreshToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    if (isEmpty(refreshToken)) {
      throw InternalError.Unauthorized();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findRefreshToken(refreshToken);
    if (isEmpty(userData) || isEmpty(tokenFromDb)) {
      throw InternalError.Unauthorized();
    }
    const user = await UserModel.findById(userData._id);
    return AuthService.saveTokenAndBuildAuthResponse(user);
  }
}

export default new AuthService();
