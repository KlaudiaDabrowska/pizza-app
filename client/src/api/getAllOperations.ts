import { apiClient } from "../config/apiConfig";
import { Direction } from "../lib/types/Direction";
import { IOperation } from "../lib/types/IOperation";
import { IPageableResponse } from "../lib/types/Response";

export const getAllOperations = async (
  page: number,
  sortField: string,
  sortDirection: Direction
) => {
  const response = await apiClient.get<IPageableResponse<IOperation>>(
    `/operations?itemsPerPage=10&page=${page}&sortBy=${sortField}:${sortDirection}`
  );
  return response.data;
};
