import { model, Schema } from "mongoose";
import { ArticleDTO } from "../dto/article.dto";

const schema = new Schema<ArticleDTO>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: Number,
  likes: [Number],
  author: Object
});

export const Articles = model<ArticleDTO>("articles", schema);
