import { apiClient } from "../config/apiConfig";
import { IIngredient } from "../types/IIngredient";

export const getAllIngredients = async () => {
  const response = await apiClient.get<IIngredient[]>(`/ingredients`);
  return response.data;
};
