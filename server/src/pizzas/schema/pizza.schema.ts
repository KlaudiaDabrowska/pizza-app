import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Ingredient } from 'src/ingredients/schema/ingredient.schema';

@Schema()
export class Pizza {
  @Prop({ required: true })
  price: number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }] })
  ingredients: Ingredient[];
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
