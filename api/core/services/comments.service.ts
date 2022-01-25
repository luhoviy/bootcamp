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
    return CommentModel.findById(comment.id).populate("author", { password: 0 });
  }

  async delete(_id: string, user: UserJwtPayload): Promise<void> {
    const comment = await CommentModel.findById(_id);
    if (isEmpty(comment)) {
      throw InternalError.BadRequest(`Comment with id ${_id} not found`);
    }

    if (String(comment.author) !== user._id && !isAdmin(user)) {
      throw InternalError.Forbidden("Access denied. User can delete only comments created by himself.");
    }
    await CommentModel.deleteOne({ _id });
    return;
  }

  async update(id: string, text: string, user: UserJwtPayload): Promise<CommentDto> {
    const comment = await CommentModel.findById(id);
    if (isEmpty(comment)) {
      throw InternalError.BadRequest(`Comment with id ${id} not found`);
    }

    if (String(comment.author) !== user._id && !isAdmin(user)) {
      throw InternalError.Forbidden("Access denied. User can modify only comments created by himself.");
    }
    return CommentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          text
        }
      },
      { new: true, populate: { path: "author", select: { password: 0 } } }
    );
  }
}

export default new CommentsService();
