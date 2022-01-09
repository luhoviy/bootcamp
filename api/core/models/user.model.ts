import { model, Schema } from "mongoose";
import { UserDTO } from "../dto/user.dto";

const schema = new Schema<UserDTO>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  displayName: { type: String }
});

export const UserModel = model<UserDTO>("users", schema);
