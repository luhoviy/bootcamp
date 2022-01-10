import { Schema } from "mongoose";

export class TokenDto {
  user: Schema.Types.ObjectId;
  refreshToken: string;
}
