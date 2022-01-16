import { User } from "./user.model";
import { Comment } from "./comment.model";

export class BaseArticle {
  title: string;
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

export class Article extends BaseArticle {
  _id: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  tags: string[];
  author: User;

  // for client side
  currentUserLiked?: boolean;

  constructor(article: Article) {
    super(article.title, article.description);
    this._id = article._id;
    this.createdAt = article.createdAt;
    this.likes = article.likes;
    this.comments = article.comments;
    this.tags = article.tags;
    this.author = article.author;
  }
}
