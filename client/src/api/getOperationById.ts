import { apiClient } from "../config/apiConfig";
import { IOperationWithRelated } from "../types/IOperation";

export const getOperationById = async (id: string) => {
  const response = await apiClient.get<IOperationWithRelated>(
    `/operations/${id}`
  );
  return response.data;
};
