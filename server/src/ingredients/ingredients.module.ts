import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientSchema } from './schema/ingredient.schema';
import { PizzaSchema } from 'src/pizzas/schema/pizza.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ingredient', schema: IngredientSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Pizza', schema: PizzaSchema }]),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
