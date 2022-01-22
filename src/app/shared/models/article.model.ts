import { User } from "./user.model";
import { Comment } from "./comment.model";

export class BaseArticle {
  title: string;
  description: string;
  tags: string[];

  constructor(article: BaseArticle) {
    this.title = article.title;
    this.description = article.description;
    this.tags = article.tags || [];
  }
}

export class Article extends BaseArticle {
  _id: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  author: User;

  // for client side
  currentUserLiked?: boolean;

  constructor(article: Article) {
    super(article);
    this._id = article._id;
    this.createdAt = article.createdAt;
    this.likes = article.likes;
    this.comments = article.comments;
    this.tags = article.tags;
    this.author = article.author;
  }
}
