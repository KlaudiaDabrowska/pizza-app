import { IIngredient } from "./IIngredient";
import { IOperation } from "./IOperation";

export interface IPizza {
  _id: string;
  name: string;
  price: number;
}

export interface IPizzaWithRelated extends IPizza {
  ingredients: IIngredient[];
  operations: IOperation[];
}
