import { IIngredient } from "./IIngredient";
import { IPizza } from "./IPizza";

export interface IOperation {
  _id: string;
  name: string;
}

export interface IOperationWithRelated extends IOperation {
  pizzas: IPizza[];
  ingredients: IIngredient[];
}
