import { faker } from "@faker-js/faker";
import { IIngredientWithRelated } from "../types/IIngredient";

export const generateMockIngredientResponse = (): IIngredientWithRelated => {
  return {
    _id: faker.string.uuid(),
    name: faker.lorem.word(),
    operation: {
      _id: faker.string.uuid(),
      name: faker.lorem.word(),
    },
    pizzas: [
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word(),
        price: faker.number.int(),
      },
    ],
  };
};
