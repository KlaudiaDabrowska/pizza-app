import { apiClient } from "../config/apiConfig";
import { Direction } from "../lib/types/Direction";
import { IIngredient } from "../lib/types/IIngredient";
import { IPageableResponse } from "../lib/types/Response";

export const getAllIngredients = async (
  page: number,
  sortField: string,
  sortDirection: Direction
) => {
  const response = await apiClient.get<IPageableResponse<IIngredient>>(
    `/ingredients?itemsPerPage=10&page=${page}&sortBy=${sortField}:${sortDirection}`
  );
  return response.data;
};
