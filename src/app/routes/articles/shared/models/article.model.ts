import { User } from "../../../../authentication/models/user.model";
import { uniqueId } from "lodash";

export class Article {
  public authorId: number;
  public createdAt: number = new Date().getTime();
  public id: number = +uniqueId();
  public likes: number[] = [];

  // for client side
  public author: User;
  public currentUserLiked: boolean;

  constructor(public title: string, public description: string) {}
}
