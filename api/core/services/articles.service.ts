import * as faker from "faker";
import { times } from "lodash";

class ArticlesService {
  getAll() {
    return times(faker.datatype.number(20), () => ({
      title: faker.lorem.words(faker.datatype.number(10)),
      description: faker.lorem.words(faker.datatype.number(50)),
      author: {
        firstName: "John",
        email: "john.doe@mail.com",
        lastName: "Doe",
        id: 666,
        displayName: "John Doe"
      },
      authorId: 666,
      likes: times(faker.datatype.number(50), () => faker.datatype.number(10000)),
      createdAt: faker.date.past(Math.round(1)).getTime()
    }));
  }
}

export default new ArticlesService();
