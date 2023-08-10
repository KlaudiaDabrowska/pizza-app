import { IOperation } from "./IOperation";
import { IPizza } from "./IPizza";

export interface IIngredient {
  _id: string;
  name: string;
}

export interface IIngredientWithRelated extends IIngredient {
  operation: IOperation;
  pizzas: IPizza[];
}
