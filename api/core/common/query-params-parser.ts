import QueryString from "qs";
import { isEmpty } from "lodash";
import { SortOrder } from "./enums";
import { SortOptions } from "./models";

export interface ParseResult {
  param: string;
  value: string | string[];
  multiple: boolean;
}

export class QueryParamsParser {
  static parse(query: QueryString.ParsedQs, paramName: string, canBeMultiple = true): ParseResult | null {
    let paramValue: string | string[] = query[paramName] as string;
    if (isEmpty(paramValue)) {
      return null;
    }

    const result = { param: paramName } as ParseResult;
    paramValue = canBeMultiple ? paramValue.split(",") : paramValue;
    result.multiple = Array.isArray(paramValue) && paramValue.length > 1;
    result.value = result.multiple ? paramValue : Array.isArray(paramValue) ? paramValue[0] : paramValue;
    return result;
  }

  static parseSortParam(query: QueryString.ParsedQs, paramName: string = "sort"): SortOptions | null {
    const parseResult = QueryParamsParser.parse(query, paramName);
    if (isEmpty(parseResult)) {
      return null;
    }

    const result = new SortOptions(
      parseResult.multiple ? parseResult.value[0] : (parseResult.value as string)
    );
    const order = parseResult.multiple && !!parseResult.value[1] ? parseResult.value[1] : SortOrder.DESC;
    result.order = order === SortOrder.ASC ? SortOrder.ASC : SortOrder.DESC;
    return result;
  }
}
