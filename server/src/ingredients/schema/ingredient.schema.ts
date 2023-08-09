import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Pizza } from 'src/pizzas/schema/pizza.schema';

@Schema()
export class Ingredient {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Pizza' }] })
  pizzas: Pizza[];
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
