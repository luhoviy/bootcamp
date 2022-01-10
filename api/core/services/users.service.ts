import { UserModel } from "../models/user.model";
import { UserDTO } from "../dto/user.dto";

class UsersService {
  async getAll(): Promise<UserDTO[]> {
    return UserModel.find();
  }
}

export default new UsersService();
