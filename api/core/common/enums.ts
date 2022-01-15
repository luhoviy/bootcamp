export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  INTERNAL_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum SortOrder {
  DESC = "desc",
  ASC = "asc"
}
