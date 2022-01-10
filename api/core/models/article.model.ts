import { model, Schema } from "mongoose";
import { ArticleDTO } from "../dto/article.dto";

const schema = new Schema<ArticleDTO>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  likes: [String],
  createdAt: { type: Number, default: Date.now() },
  author: Object
});

export const ArticleModel = model<ArticleDTO>("articles", schema);
