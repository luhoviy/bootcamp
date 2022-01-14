import { model, Schema } from "mongoose";
import { ArticleDTO } from "../dto/article.dto";

const schema = new Schema<ArticleDTO>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
    author: { type: Schema.Types.ObjectId, ref: "users" }
  },
  { timestamps: { createdAt: true } }
);

export const ArticleModel = model<ArticleDTO>("articles", schema);
