import { User } from "../../../../authentication/models/user.model";

export class Article {
  public createdAt: number;
  public _id: string;
  public likes: string[] = [];

  // for client side
  public author: User;
  public currentUserLiked: boolean;

  constructor(public title: string, public description: string) {}
}
