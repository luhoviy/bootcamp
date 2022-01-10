import { model, Schema } from "mongoose";
import { RoleDto } from "../dto/role.dto";
import { Role } from "../common/enums";

const schema = new Schema<RoleDto>({
  type: { type: String, enum: Role, default: Role.USER, unique: true }
});

export const RoleModel = model<RoleDto>("roles", schema);
