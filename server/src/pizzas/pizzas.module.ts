import { Module } from '@nestjs/common';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzaSchema } from './schema/pizza.schema';
import { IngredientSchema } from 'src/pizzas/ingredients/schema/ingredient.schema';
import { OperationSchema } from './operations/schema/operation.schema';
import { IngredientsController } from './ingredients/ingredients.controller';
import { OperationsController } from './operations/operations.controller';
import { IngredientsService } from './ingredients/ingredients.service';
import { OperationsService } from './operations/operations.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pizza', schema: PizzaSchema }]),
    MongooseModule.forFeature([
      { name: 'Ingredient', schema: IngredientSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Operation', schema: OperationSchema }]),
  ],
  controllers: [PizzasController, IngredientsController, OperationsController],
  providers: [PizzasService, IngredientsService, OperationsService],
})
export class PizzasModule {}
