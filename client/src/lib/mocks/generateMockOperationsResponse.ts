import { faker } from "@faker-js/faker";
import { IPageableResponse } from "../types/Response";
import { IOperation } from "../types/IOperation";

export const generateMockOperationsResponse = (
  page: number = 1,
  items: number = 3,
  total: number = 3
): IPageableResponse<IOperation> => {
  const data: IOperation[] = Array(items)
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
