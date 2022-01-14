import { Schema } from "mongoose";

export class CommentDto {
  _id: Schema.Types.ObjectId;
  text: string;
  article: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;

  constructor(comment: CommentDto) {
    this._id = comment._id;
    this.text = comment.text;
    this.article = comment.article;
    this.author = comment.author;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }
}
