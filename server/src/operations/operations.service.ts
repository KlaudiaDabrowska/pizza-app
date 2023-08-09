import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { Operation } from './schema/operation.schema';

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel('Operation') private operationModel: mongoose.Model<Operation>,
  ) {}

  async getAll(): Promise<Operation[]> {
    return await this.operationModel.find();
  }
  async getById(id: string): Promise<Operation> {
    const pizza = await this.operationModel.findById(id);

    if (!pizza) throw new NotFoundException('Pizza not found');

    return pizza;
  }

  async add(createOperationDto: CreateOperationDto): Promise<Operation> {
    try {
      const newOperation = await this.operationModel.create(createOperationDto);
      return newOperation.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: string): Promise<Operation> {
    return await this.operationModel.findByIdAndRemove(id);
  }

  async edit(id: string, name: string): Promise<Operation> {
    return await this.operationModel.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}
