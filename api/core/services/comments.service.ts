import { CommentModel } from "../models/comment.model";
import { CommentDto } from "../dto/comment.dto";
import { InternalError } from "../common/error-handler";
import ArticlesService from "./articles.service";
import { isEmpty } from "lodash";
import { UserJwtPayload } from "../dto/user.dto";
import { isAdmin } from "../common/utils";

class CommentsService {
  async add(text: string, articleID: string, user: UserJwtPayload): Promise<CommentDto> {
    const comment = await CommentModel.create({ text, article: articleID, author: user._id });
    await ArticlesService.addComment(articleID, comment._id);
    return new CommentDto(comment);
  }

  async delete(_id: string, user: UserJwtPayload): Promise<void> {
    const comment = await CommentModel.findById(_id);
    if (isEmpty(comment)) {
      throw InternalError.NotFound(`Comment with id ${_id} not found`);
    }

    if (String(comment.author) !== user._id && !isAdmin(user)) {
      throw InternalError.Forbidden("Access denied. User can delete only posts created by himself.");
    }
    await CommentModel.deleteOne({ _id });
    return;
  }

  async update(id: string, text: string, user: UserJwtPayload): Promise<CommentDto> {
    const comment = await CommentModel.findById(id);
    if (isEmpty(comment)) {
      throw InternalError.NotFound(`Comment with id ${id} not found`);
    }

    if (String(comment.author) !== user._id && !isAdmin(user)) {
      throw InternalError.Forbidden("Access denied. User can modify only posts created by himself.");
    }
    comment.text = text;
    await comment.save();
    return new CommentDto(comment);
  }
}

export default new CommentsService();
