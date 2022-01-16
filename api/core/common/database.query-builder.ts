import { Query } from "mongoose";
import { isEmpty } from "lodash";
import { SortOptions } from "./models";
import { ParseResult } from "./query-params-parser";

export class DatabaseQueryBuilder {
  static buildSortQuery(query: Query<any, any>, options: SortOptions): Query<any, any> {
    if (isEmpty(options)) {
      return query;
    }
    return query.sort({ [options.sortBy]: options.order });
  }

  static setQueryPagination(query: Query<any, any>, parsedParam: ParseResult): Query<any, any> {
    if (isEmpty(parsedParam)) {
      return query;
    }
    parsedParam.value = parsedParam.multiple ? parsedParam.value[0] : parsedParam.value;
    const value = +parsedParam.value;
    if (Number.isNaN(value)) {
      return query;
    }
    return parsedParam.param === "limit" ? query.limit(value) : query.skip(value);
  }

  static setQueryIntersection(query: Query<any, any>, parsedParam: ParseResult): Query<any, any> {
    if (isEmpty(parsedParam)) {
      return query;
    }
    const searchValues = parsedParam.multiple ? parsedParam.value : [parsedParam.value];
    return query.find({
      [parsedParam.param]: {
        $in: searchValues
      }
    });
  }

  static buildQueryBySearchText(query: Query<any, any>, parsedParam: ParseResult, searchFields: string[]) {
    if (isEmpty(parsedParam)) {
      return query;
    }
    const searchText = parsedParam.multiple
      ? (parsedParam.value as string[]).join(",")
      : (parsedParam.value as string);
    const regex = new RegExp(searchText, "i");
    const searchOptions = searchFields.map((field) => ({
      [field]: {
        $regex: regex
      }
    }));
    return query.find({ $or: searchOptions });
  }
}
