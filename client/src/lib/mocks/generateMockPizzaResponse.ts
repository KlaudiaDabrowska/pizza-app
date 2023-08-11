import { faker } from "@faker-js/faker";
import { IPizzaWithRelated } from "../types/IPizza";

export const generateMockPizzaResponse = (): IPizzaWithRelated => {
  return {
    _id: faker.string.uuid(),
    name: faker.lorem.word(),
    price: faker.number.int(),
    ingredients: [
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word(),
      },
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word(),
      },
    ],
    operations: [
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word(),
      },
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word(),
      },
    ],
  };
};
