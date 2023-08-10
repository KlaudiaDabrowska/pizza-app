import { apiClient } from "../config/apiConfig";
import { Direction } from "../lib/types/Direction";
import { IPizza } from "../lib/types/IPizza";
import { IPageableResponse } from "../lib/types/Response";

export const getAllPizzas = async (
  page: number,
  sortField: string,
  sortDirection: Direction
) => {
  const response = await apiClient.get<IPageableResponse<IPizza>>(
    `/pizzas?itemsPerPage=10&page=${page}&sortBy=${sortField}:${sortDirection}`
  );

  return response.data;
};
