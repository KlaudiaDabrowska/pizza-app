import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Ingredient } from 'src/pizzas/ingredients/schema/ingredient.schema';
import { Operation } from '../operations/schema/operation.schema';

@Schema()
export class Pizza {
  @Prop({ required: true })
  price: number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }] })
  ingredients: Ingredient[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Operation' }] })
  operations: Operation[];
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
