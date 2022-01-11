import { model, Schema } from "mongoose";
import { ArticleDTO } from "../dto/article.dto";

const schema = new Schema<ArticleDTO>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: [String],
    author: Object
  },
  { timestamps: { createdAt: true } }
);

export const ArticleModel = model<ArticleDTO>("articles", schema);
