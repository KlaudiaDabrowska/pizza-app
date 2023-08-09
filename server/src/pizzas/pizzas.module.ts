import { Module } from '@nestjs/common';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzaSchema } from './schema/pizza.schema';
import { IngredientSchema } from 'src/ingredients/schema/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pizza', schema: PizzaSchema }]),
    MongooseModule.forFeature([
      { name: 'Ingredient', schema: IngredientSchema },
    ]),
  ],
  controllers: [PizzasController],
  providers: [PizzasService],
})
export class PizzasModule {}
