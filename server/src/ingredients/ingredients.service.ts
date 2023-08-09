import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { Ingredient } from './schema/ingredient.schema';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel('Ingredient')
    private ingredientModel: mongoose.Model<Ingredient>,
  ) {}

  async getAll(): Promise<Ingredient[]> {
    return await this.ingredientModel.find().populate('pizzas');
  }

  async getById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientModel.findById(id);

    if (!ingredient) throw new NotFoundException('Ingredient not found');

    return ingredient;
  }

  async add(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    try {
      const newIngredient = await this.ingredientModel.create(
        createIngredientDto,
      );
      return newIngredient.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: string): Promise<Ingredient> {
    return await this.ingredientModel.findByIdAndRemove(id);
  }

  async edit(id: string, name: string): Promise<Ingredient> {
    return await this.ingredientModel.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}
