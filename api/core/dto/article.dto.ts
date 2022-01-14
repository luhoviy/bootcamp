import { Schema } from "mongoose";

export class ArticleDTO {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  likes: string[];
  comments: string[];
  author: string | Schema.Types.ObjectId;

  constructor(article: ArticleDTO) {
    this._id = article._id;
    this.title = article.title;
    this.description = article.description;
    this.createdAt = article.createdAt;
    this.likes = article.likes;
    this.comments = article.comments;
    this.author = article.author;
  }
}
