import { User } from "./user.model";

export class BaseComment {
  text: string;
  article: string;

  constructor(text: string, articleID: string) {
    this.text = text;
    this.article = articleID;
  }
}

export class Comment extends BaseComment {
  _id: string;
  author: User;
  createdAt: string;
  updatedAt: string;

  // for client side
  isEdited?: boolean;

  constructor(comment: Comment) {
    super(comment.text, comment.article);
    this._id = comment._id;
    this.author = comment.author;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.isEdited = !!comment.createdAt && comment.updatedAt && comment.createdAt !== comment.updatedAt;
  }
}

export class CommentExtended extends Comment {
  editMode = false;

  constructor(comment: Comment) {
    super(comment);
  }
}
