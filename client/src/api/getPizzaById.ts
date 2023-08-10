import { apiClient } from "../config/apiConfig";
import { IPizzaWithRelated } from "../lib/types/IPizza";

export const getPizzaById = async (id: string) => {
  const response = await apiClient.get<IPizzaWithRelated>(`/pizzas/${id}`);
  return response.data;
};
