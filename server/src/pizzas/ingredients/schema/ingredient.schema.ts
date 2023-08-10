import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Operation } from 'src/pizzas/operations/schema/operation.schema';

@Schema()
export class Ingredient {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Operation' })
  operation: Operation;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
