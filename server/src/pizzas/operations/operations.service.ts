import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { Operation } from './schema/operation.schema';
import { Pizza } from '../schema/pizza.schema';
import { Ingredient } from '../ingredients/schema/ingredient.schema';
import { EditOperationDto } from './dtos/edit-operation.dto';

export interface IOperation {
  _id: mongoose.Types.ObjectId;
  name: string;
}

export interface IOperationWithRelated extends IOperation {
  pizzas: Pizza[];
  ingredients: Ingredient[];
}

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel('Operation') private operationModel: mongoose.Model<Operation>,
    @InjectModel('Pizza')
    private pizzaModel: mongoose.Model<Pizza>,
    @InjectModel('Ingredient')
    private ingredientModel: mongoose.Model<Ingredient>,
  ) {}

  async getAll(): Promise<IOperation[]> {
    return await this.operationModel.find();
  }
  async getById(id: string): Promise<IOperationWithRelated> {
    const operation = await this.operationModel.findById(id);

    if (!operation) throw new NotFoundException('Operation not found');

    const pizzas = await this.pizzaModel
      .find({ operations: id })
      .select('-ingredients')
      .select('-operations');

    const ingredients = await this.ingredientModel
      .find({ operation: id })
      .select('-operation');

    return {
      _id: operation._id,
      name: operation.name,
      pizzas: pizzas,
      ingredients: ingredients,
    };
  }

  async add(createOperationDto: CreateOperationDto): Promise<IOperation> {
    try {
      const newOperation = await this.operationModel.create(createOperationDto);
      return newOperation.save();
    } catch (err) {
      if (err.name === 'MongoServerError' && err?.code === 11000) {
        throw new BadRequestException('Given operation already exists');
      }
      throw err;
    }
  }

  async edit(
    id: string,
    editOperationDto: EditOperationDto,
  ): Promise<IOperation> {
    return await this.operationModel.findByIdAndUpdate(
      id,
      { ...editOperationDto },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async remove(id: string): Promise<IOperation> {
    return await this.operationModel.findByIdAndRemove(id);
  }
}
