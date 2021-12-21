import { ArticleDTO } from "../dto/article.dto";
import { Articles } from "../schemas/article.schema";
import { isEmpty } from "lodash";
import { InternalError } from "../common/error-handler";
import { StatusCode } from "../common/enums";

class ArticlesService {
  async getAll(): Promise<ArticleDTO[]> {
    return Articles.find();
  }

  async create(article: ArticleDTO): Promise<ArticleDTO> {
    if (isEmpty(article)) {
      throw new InternalError("Article data is missing in request body.", StatusCode.BAD_REQUEST);
    }

    article.createdAt = new Date().getTime();
    // temporary mocked user
    article.author = {
      firstName: "John",
      email: "john.doe@mail.com",
      lastName: "Doe",
      _id: "666",
      displayName: "John Doe"
    };

    return Articles.create(article);
  }

  async deleteOne(id: string): Promise<ArticleDTO> {
    return Articles.findByIdAndDelete(id);
  }

  async likeArticle(params: { articleID: string; userID: string }): Promise<ArticleDTO> {
    ArticlesService.validateQueryParams(params);
    return Articles.findByIdAndUpdate(
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
    return Articles.findByIdAndUpdate(
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
