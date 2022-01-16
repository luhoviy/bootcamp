import { InternalError } from "../common/error-handler";
import { isEmpty } from "lodash";
import { TagModel } from "../models/tag.model";
import { TagDto } from "../dto/tag.dto";

class TagService {
  async getAll(): Promise<TagDto[]> {
    return TagModel.find();
  }

  async getOne(text: string): Promise<TagDto> {
    return TagModel.findOne({ text });
  }

  async add(text: string): Promise<TagDto> {
    return TagModel.create({ text });
  }

  async delete(_id: string): Promise<void> {
    const tag = await TagModel.findById(_id);
    if (isEmpty(tag)) {
      throw InternalError.NotFound(`Tag with id ${_id} not found`);
    }
    await TagModel.deleteOne({ _id });
    return;
  }

  async update(id: string, text: string): Promise<TagDto> {
    const tag = await TagModel.findById(id);
    if (isEmpty(tag)) {
      throw InternalError.NotFound(`Tag with id ${id} not found`);
    }
    tag.text = text;
    await tag.save();
    return new TagDto(tag);
  }

  async validateTags(tags: string[]): Promise<string[]> {
    try {
      const foundTags = await TagModel.find({
        text: { $in: tags }
      });
      return foundTags.map((tag) => tag.text);
    } catch (e) {
      return [];
    }
  }
}

export default new TagService();
