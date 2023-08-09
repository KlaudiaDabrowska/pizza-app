import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreatePizzaDto } from './dtos/create-pizza.dto';
import { Pizza } from './schema/pizza.schema';
import { Ingredient } from 'src/ingredients/schema/ingredient.schema';

@Injectable()
export class PizzasService {
  constructor(
    @InjectModel('Pizza') private pizzaModel: mongoose.Model<Pizza>,
    @InjectModel('Ingredient')
    private ingredientModel: mongoose.Model<Ingredient>,
  ) {}

  async getAll(): Promise<Pizza[]> {
    return await this.pizzaModel.find();
  }

  async getById(id: string): Promise<Pizza> {
    const pizza = await this.pizzaModel.findById(id);

    if (!pizza) throw new NotFoundException('Pizza not found');

    return pizza;
  }

  async add(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    try {
      const ingredients = await this.ingredientModel.find({
        _id: { $in: createPizzaDto.ingredients },
      });
      console.log(createPizzaDto.ingredients);

      const newPizza = await this.pizzaModel.create({
        name: createPizzaDto.name,
        price: createPizzaDto.price,
        ingredients: ingredients,
      });
      return newPizza.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: string): Promise<Pizza> {
    return await this.pizzaModel.findByIdAndRemove(id);
  }

  async edit(id: string, price: number): Promise<Pizza> {
    return await this.pizzaModel.findByIdAndUpdate(
      id,
      { price },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}
