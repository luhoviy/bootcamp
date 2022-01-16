import { ArticleDTO } from "../dto/article.dto";
import { ArticleModel } from "../models/article.model";
import { isEmpty } from "lodash";
import { InternalError } from "../common/error-handler";
import { UserJwtPayload } from "../dto/user.dto";
import { PopulateOptions, Query } from "mongoose";
import QueryString from "qs";
import { QueryParamsParser } from "../common/query-params-parser";
import { DatabaseQueryBuilder } from "../common/database.query-builder";
import { SortOptions } from "../common/models";
import TagsService from "./tags.service";
import { isAdmin } from "../common/utils";

class ArticlesService {
  private static buildArticlePopulateOptions(): PopulateOptions[] {
    return [
      {
        path: "comments",
        populate: { path: "author", select: { password: 0 } }
      },
      {
        path: "author",
        select: { password: 0 }
      },
      {
        path: "tags"
      }
    ];
  }

  private static populateArticleQuery(query: Query<any, any>) {
    return query.populate(ArticlesService.buildArticlePopulateOptions());
  }

  async getAll(queryParams: QueryString.ParsedQs): Promise<ArticleDTO[]> {
    let query = ArticleModel.find();
    query = DatabaseQueryBuilder.buildQueryBySearchText(
      query,
      QueryParamsParser.parse(queryParams, "search", false),
      ["title", "description"]
    );
    const defaultSortOptions = new SortOptions();
    const sortOptions = QueryParamsParser.parseSortParam(queryParams) || defaultSortOptions;
    query = DatabaseQueryBuilder.buildSortQuery(query, sortOptions);
    query = DatabaseQueryBuilder.setQueryIntersection(query, QueryParamsParser.parse(queryParams, "tags"));
    query = DatabaseQueryBuilder.setQueryPagination(query, QueryParamsParser.parse(queryParams, "skip"));
    query = DatabaseQueryBuilder.setQueryPagination(query, QueryParamsParser.parse(queryParams, "limit"));

    return ArticlesService.populateArticleQuery(query);
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
      { new: true, populate: ArticlesService.buildArticlePopulateOptions() }
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
      { new: true, populate: ArticlesService.buildArticlePopulateOptions() }
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
      { new: true, populate: ArticlesService.buildArticlePopulateOptions() }
    );
  }

  async addTag(articleID: string, tag: string, user: UserJwtPayload): Promise<ArticleDTO> {
    const article = await this.getOne(articleID);
    if (isEmpty(article)) {
      throw InternalError.NotFound(`Article with id ${articleID} not found`);
    }

    if (String(article.author) !== user._id && !isAdmin(user)) {
      throw InternalError.Forbidden("Access denied. User can add tags only to posts created by himself.");
    }

    const desiredTag = await TagsService.getOne(tag);
    if (!desiredTag) {
      throw InternalError.NotFound(`Tag '${tag}' not found`);
    }

    return ArticleModel.findByIdAndUpdate(
      articleID,
      {
        $addToSet: {
          tags: tag
        }
      },
      { new: true, populate: ArticlesService.buildArticlePopulateOptions() }
    );
  }

  async removeTag(articleID: string, tag: string, user: UserJwtPayload): Promise<ArticleDTO> {
    const article = await this.getOne(articleID);
    if (isEmpty(article)) {
      throw InternalError.NotFound(`Article with id ${articleID} not found`);
    }

    if (String(article.author) !== user._id && !isAdmin(user)) {
      throw InternalError.Forbidden(
        "Access denied. User can remove tags only from posts created by himself."
      );
    }

    return ArticleModel.findByIdAndUpdate(
      articleID,
      {
        $pull: {
          tags: tag
        }
      },
      { new: true, populate: ArticlesService.buildArticlePopulateOptions() }
    );
  }
}

export default new ArticlesService();
