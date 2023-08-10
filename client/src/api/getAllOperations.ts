import { apiClient } from "../config/apiConfig";
import { IOperation } from "../types/IOperation";

export const getAllOperations = async () => {
  const response = await apiClient.get<IOperation[]>(`/operations`);
  return response.data;
};
