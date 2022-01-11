import * as jwt from "jsonwebtoken";
import { UserJwtPayload } from "../dto/user.dto";
import { JwtTokens } from "../common/interfaces";
import { TokenModel } from "../models/token.model";
import { TokenDto } from "../dto/token.dto";

class TokenService {
  generateTokens(payload: UserJwtPayload): JwtTokens {
    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" });
    return {
      accessToken,
      refreshToken
    };
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<TokenDto> {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return TokenModel.create({ user: userId, refreshToken });
  }

  async findRefreshToken(refreshToken: string): Promise<TokenDto> {
    return TokenModel.findOne({ refreshToken });
  }

  async removeRefreshToken(refreshToken: string): Promise<void> {
    await TokenModel.deleteOne({ refreshToken });
    return;
  }

  validateAccessToken(accessToken: string): UserJwtPayload {
    try {
      const { JWT_ACCESS_SECRET } = process.env;
      return jwt.verify(accessToken, JWT_ACCESS_SECRET) as UserJwtPayload;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string): UserJwtPayload {
    try {
      const { JWT_REFRESH_SECRET } = process.env;
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET) as UserJwtPayload;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
