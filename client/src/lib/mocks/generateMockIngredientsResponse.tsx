import { faker } from "@faker-js/faker";
import { IPageableResponse } from "../types/Response";
import { IIngredient } from "../types/IIngredient";

export const generateMockIngredientsResponse = (
  page: number = 1,
  items: number = 3,
  total: number = 3
): IPageableResponse<IIngredient> => {
  const data: IIngredient[] = Array(items)
    .fill(0)
    .map((_) => {
      return {
        _id: faker.string.uuid(),
        name: faker.internet.displayName(),
      };
    });

  return {
    data: data,
    meta: {
      page: page,
      items: items,
      total: total,
    },
  };
};
