import { model, Schema } from "mongoose";
import { TokenDto } from "../dto/token.dto";

const schema = new Schema<TokenDto>({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  refreshToken: { type: String }
});

export const TokenModel = model<TokenDto>("tokens", schema);
