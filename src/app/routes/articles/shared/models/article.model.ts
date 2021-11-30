import { User } from "../../../../authentication/models/user.model";

interface ArticleModel {
  id?: number;
  title?: string;
  description?: string;
  likes?: number;
  createdAt?: number;
  editedAt?: number;
  authorId?: number;

  // for client side
  author?: User;
}

export class Article implements ArticleModel {
  constructor(
    public title: string,
    public description: string,
    public authorId: number,
    public createdAt: number = new Date().getTime(),
    public id: number = null,
    public likes: number = 0,
    public editedAt: number = null,
    public author: User = User.getMockedUser()
  ) {
    this.authorId = authorId || author.id;
  }
}
