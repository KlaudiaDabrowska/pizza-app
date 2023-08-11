import { faker } from "@faker-js/faker";
import { IOperationWithRelated } from "../types/IOperation";

export const generateMockOperationResponse = (): IOperationWithRelated => {
  return {
    _id: faker.string.uuid(),
    name: faker.lorem.word(),
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
    pizzas: [
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word(),
        price: faker.number.int(),
      },
    ],
  };
};
