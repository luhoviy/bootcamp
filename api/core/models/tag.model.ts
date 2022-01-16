import { model, Schema } from "mongoose";
import { TagDto } from "../dto/tag.dto";

const schema = new Schema<TagDto>({
  text: { type: String, unique: true }
});

schema.paths["text"].set((val: string) => val.trim());

export const TagModel = model<TagDto>("tags", schema);
