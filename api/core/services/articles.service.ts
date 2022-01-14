import { ArticleDTO } from "../dto/article.dto";
import { ArticleModel } from "../models/article.model";
import { isEmpty } from "lodash";
import { InternalError } from "../common/error-handler";
import { UserJwtPayload } from "../dto/user.dto";
import { Query } from "mongoose";

class ArticlesService {
  private static populateArticleQuery(query: Query<any, any>) {
    return query
      .populate({
        path: "comments",
        populate: { path: "author", select: { password: 0 } }
      })
      .populate("author", { password: 0 });
  }

  async getAll(): Promise<ArticleDTO[]> {
    return ArticlesService.populateArticleQuery(ArticleModel.find());
  }

  async getOne(_id: string): Promise<ArticleDTO> {
    return ArticlesService.populateArticleQuery(ArticleModel.find({ _id }));
  }

  async create(article: ArticleDTO, user: UserJwtPayload): Promise<ArticleDTO> {
    if (isEmpty(article)) {
      throw InternalError.BadRequest("Article data is missing in request body.");
    }

    article.author = user._id;
    return ArticleModel.create(article);
  }

  async deleteOne(_id: string): Promise<void> {
    await ArticleModel.deleteOne({ _id });
    return;
  }

  async likeArticle(articleID: string, user: UserJwtPayload): Promise<ArticleDTO> {
    return ArticleModel.findByIdAndUpdate(
      articleID,
      {
        $addToSet: {
          likes: user._id
        }
      },
      { new: true }
    );
  }

  async dislikeArticle(articleID: string, user: UserJwtPayload): Promise<ArticleDTO> {
    return ArticleModel.findByIdAndUpdate(
      articleID,
      {
        $pull: {
          likes: user._id
        }
      },
      { new: true }
    );
  }

  async addComment(articleID: string, commentID: string): Promise<ArticleDTO> {
    return ArticleModel.findByIdAndUpdate(
      articleID,
      {
        $addToSet: {
          comments: commentID
        }
      },
      { new: true }
    );
  }
}

export default new ArticlesService();
