export enum SortEnum {
  LIKES = "likes",
  COMMENTS = "comments",
  TIME = "createdAt"
}

export enum SortOrder {
  DESC = "desc",
  ASC = "asc"
}

export class BaseSearchSettings {
  tags: string[];
  sortBy: SortEnum;
  order: SortOrder;

  constructor(settings?: BaseSearchSettings) {
    this.tags = settings?.tags || [];
    this.sortBy = settings?.sortBy || SortEnum.TIME;
    this.order = settings?.order || SortOrder.DESC;
  }
}

export class SearchConfig extends BaseSearchSettings {
  skip: number;
  limit: number;
  searchKeyword: string;

  constructor(config?: SearchConfig) {
    super(config);
    this.skip = config?.skip || 0;
    this.limit = config?.limit || 10;
    this.searchKeyword = config?.searchKeyword || "";
  }
}
