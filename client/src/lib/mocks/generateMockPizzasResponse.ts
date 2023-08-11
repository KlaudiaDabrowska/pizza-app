import { faker } from "@faker-js/faker";
import { IPageableResponse } from "../types/Response";
import { IPizza } from "../types/IPizza";

export const generateMockPizzasResponse = (
  page: number = 1,
  items: number = 3,
  total: number = 3
): IPageableResponse<IPizza> => {
  const data: IPizza[] = Array(items)
    .fill(0)
    .map((_) => {
      return {
        _id: faker.string.uuid(),
        name: faker.internet.displayName(),
        price: faker.number.float({ min: 0, max: 1000 }),
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
