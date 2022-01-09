import { ArticleDTO } from "../dto/article.dto";
import { ArticleModel } from "../models/article.model";
import { isEmpty } from "lodash";
import { InternalError } from "../common/error-handler";
import { StatusCode } from "../common/enums";

class ArticlesService {
  async getAll(): Promise<ArticleDTO[]> {
    return ArticleModel.find();
  }

  async create(article: ArticleDTO): Promise<ArticleDTO> {
    if (isEmpty(article)) {
      throw InternalError.BadRequest("Article data is missing in request body.");
    }

    // temporary mocked user
    article.author = {
      firstName: "John",
      email: "john.doe@mail.com",
      lastName: "Doe",
      _id: "666",
      displayName: "John Doe"
    };

    return ArticleModel.create(article);
  }

  async deleteOne(id: string): Promise<ArticleDTO> {
    return ArticleModel.findByIdAndDelete(id);
  }

  async likeArticle(params: { articleID: string; userID: string }): Promise<ArticleDTO> {
    ArticlesService.validateQueryParams(params);
    return ArticleModel.findByIdAndUpdate(
      params.articleID,
      {
        $addToSet: {
          likes: params.userID
        }
      },
      { new: true }
    );
  }

  async dislikeArticle(params: { articleID: string; userID: string }): Promise<ArticleDTO> {
    ArticlesService.validateQueryParams(params);
    return ArticleModel.findByIdAndUpdate(
      params.articleID,
      {
        $pull: {
          likes: params.userID
        }
      },
      { new: true }
    );
  }

  private static validateQueryParams(params: { articleID: string; userID: string }) {
    if (isEmpty(params) || isEmpty(params.articleID) || isEmpty(params.userID)) {
      throw new InternalError(
        "Invalid request. Required params articleID or userID are missing.",
        StatusCode.BAD_REQUEST
      );
    }
  }
}

export default new ArticlesService();
