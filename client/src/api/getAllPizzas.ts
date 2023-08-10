import { apiClient } from "../config/apiConfig";
import { IPizza } from "../types/IPizza";

export const getAllPizzas = async () => {
  const response = await apiClient.get<IPizza[]>(`/pizzas`);
  return response.data;
};
