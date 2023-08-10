import { apiClient } from "../config/apiConfig";
import { IIngredientWithRelated } from "../types/IIngredient";

export const getIngredientById = async (id: string) => {
  const response = await apiClient.get<IIngredientWithRelated>(
    `/ingredients/${id}`
  );
  return response.data;
};
