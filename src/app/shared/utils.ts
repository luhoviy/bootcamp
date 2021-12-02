import * as faker from "faker";
import { Article } from "../routes/articles/shared/models/article.model";
import { times } from "lodash";
import { User } from "../authentication/models/user.model";

export const generateFakeArticles = (): Article[] => {
  return times(faker.datatype.number(20), () => {
    const article = new Article(
      faker.lorem.words(faker.datatype.number(10)),
      faker.lorem.words(faker.datatype.number(500))
    );
    article.author = User.getMockedUser();
    article.authorId = article.author.id;
    article.likes = times(faker.datatype.number(2000), () =>
      faker.datatype.number(10000)
    );
    article.createdAt = faker.date.past(Math.round(1)).getTime();
    return article;
  });
};
