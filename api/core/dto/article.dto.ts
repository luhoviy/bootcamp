import { UserDTO } from "./user.dto";

export interface ArticleDTO {
  _id: string;
  title: string;
  description: string;
  createdAt: number;
  likes: string[];
  author: UserDTO;
}
