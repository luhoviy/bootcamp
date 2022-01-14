import { model, Schema } from "mongoose";
import { CommentDto } from "../dto/comment.dto";

const schema = new Schema<CommentDto>(
  {
    article: { type: Schema.Types.ObjectId, ref: "articles" },
    author: { type: Schema.Types.ObjectId, ref: "users" },
    text: String
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const CommentModel = model<CommentDto>("comments", schema);
