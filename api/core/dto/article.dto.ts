import { UserDTO } from "./user.dto";

export class ArticleDTO {
  _id: string;
  title: string;
  description: string;
  createdAt: number;
  likes: string[];
  author: UserDTO;

  constructor(article: ArticleDTO) {
    this._id = article._id;
    this.title = article.title;
    this.description = article.description;
    this.createdAt = article.createdAt;
    this.likes = article.likes;
    this.author = article.author;
  }
}
