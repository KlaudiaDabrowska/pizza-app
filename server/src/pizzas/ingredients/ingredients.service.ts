import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { Ingredient } from './schema/ingredient.schema';
import { Pizza } from '../schema/pizza.schema';
import { Operation } from '../operations/schema/operation.schema';
import { EditIngredientDto } from './dtos/edit-ingredient.dto';
import { PageDto } from '../shared/dtos/PageDto';
import { PageOptionsDto } from '../shared/dtos/PageMetaDtoParameters';

export interface IIngredient {
  _id: mongoose.Types.ObjectId;
  name: string;
}

export interface IIngredientRelated extends IIngredient {
  operation: Operation;
  pizzas: Pizza[];
}

export interface IIngredientWithOperation extends IIngredient {
  operation: Operation;
}

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel('Ingredient')
    private ingredientModel: mongoose.Model<Ingredient>,
    @InjectModel('Pizza')
    private pizzaModel: mongoose.Model<Pizza>,
    @InjectModel('Operation')
    private operationModel: mongoose.Model<Operation>,
  ) {}

  async getAll(pageOptions: PageOptionsDto): Promise<PageDto<IIngredient>> {
    const sortBy = pageOptions.sortBy.reduce((result, sortBy) => {
      const key = sortBy.field;
      result[key] = sortBy.direction;
      return result;
    }, {});

    const data = await this.ingredientModel
      .find()
      .select('-operation')
      .sort(sortBy)
      .skip(pageOptions.skip)
      .limit(pageOptions.itemsPerPage);

    const total = await this.ingredientModel.countDocuments();

    return {
      data,
      meta: {
        page: pageOptions.page,
        items: pageOptions.itemsPerPage,
        total,
      },
    };
  }

  async getById(id: string): Promise<IIngredientRelated> {
    const ingredient = await this.ingredientModel
      .findById(id)
      .populate('operation');

    if (!ingredient) throw new NotFoundException('Ingredient not found');

    const pizzas = await this.pizzaModel
      .find({ ingredients: id })
      .select('-ingredients')
      .select('-operations');

    return {
      _id: ingredient._id,
      name: ingredient.name,
      operation: ingredient.operation,
      pizzas: pizzas,
    };
  }

  async add(
    createIngredientDto: CreateIngredientDto,
  ): Promise<IIngredientWithOperation> {
    try {
      const operation = await this.operationModel.findById(
        createIngredientDto.operation,
      );

      const newIngredient = await this.ingredientModel.create({
        ...createIngredientDto,
        operation,
      });

      return newIngredient.save();
    } catch (err) {
      if (err.name === 'MongoServerError' && err?.code === 11000) {
        throw new BadRequestException('Given ingredient already exists');
      }
      throw err;
    }
  }

  async edit(
    id: string,
    editIngredientDto: EditIngredientDto,
  ): Promise<IIngredient> {
    const updatedIngredient = await this.ingredientModel
      .findByIdAndUpdate(
        id,
        {
          ...editIngredientDto,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .populate('operation');

    if (!updatedIngredient) throw new NotFoundException('Ingredient not found');

    return updatedIngredient;
  }

  async remove(id: string): Promise<IIngredient> {
    return await this.ingredientModel.findByIdAndRemove(id);
  }
}
