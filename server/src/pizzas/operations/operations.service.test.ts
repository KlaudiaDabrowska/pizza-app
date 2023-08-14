import { Test } from '@nestjs/testing';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PizzaSchema } from '../schema/pizza.schema';
import { OperationSchema } from './schema/operation.schema';
import { SortBy } from '../shared/dtos/PageMetaDtoParameters';
import { OperationsService } from './operations.service';
import { IngredientSchema } from '../ingredients/schema/ingredient.schema';
import { rootMongooseTestModule } from '../../test-utils/MongooseTestModule';

describe('OperationsService', () => {
  let operationService: OperationsService;

  const operation = {
    name: 'Operation 1',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Pizza', schema: PizzaSchema }]),
        MongooseModule.forFeature([
          { name: 'Ingredient', schema: IngredientSchema },
        ]),
        MongooseModule.forFeature([
          { name: 'Operation', schema: OperationSchema },
        ]),
      ],
      providers: [OperationsService],
    }).compile();
    operationService = module.get<OperationsService>(OperationsService);
  });

  it('should create an operation', async () => {
    const result = await operationService.add(operation);

    expect(result._id).toBeDefined();
    expect(result).toMatchObject(operation);
  });

  it('should throw BadRequestException when operation already exists', async () => {
    await operationService.add(operation);
    const secondOperation = operationService.add(operation);

    expect(secondOperation).rejects.toThrowError(
      new BadRequestException('Given operation already exists'),
    );
  });

  it('should return operation by id', async () => {
    const addedOperation = await operationService.add(operation);

    const result = await operationService.getById(
      addedOperation._id.toString(),
    );

    expect(result).toMatchObject(operation);
  });

  it('should throw an error when want to found a non-existent operation', () => {
    const result = operationService.getById(
      new mongoose.Types.ObjectId().toString(),
    );

    expect(result).rejects.toThrowError(
      new NotFoundException('Operation not found'),
    );
  });

  it('should return list of operations', async () => {
    const operation2 = {
      name: 'Operation 2',
      operation: new mongoose.Types.ObjectId(),
    };

    const addedOperation1 = await operationService.add(operation);
    const addedOperation2 = await operationService.add(operation2);

    const operationsList = {
      data: [
        {
          _id: addedOperation1._id,
          name: 'Operation 1',
          __v: 0,
        },
        {
          _id: addedOperation2._id,
          name: 'Operation 2',
          __v: 0,
        },
      ],
      meta: {
        page: 1,
        items: 2,
        total: 2,
      },
    };

    const result = await operationService.getAll({
      page: 1,
      itemsPerPage: 2,
      sortBy: [new SortBy('name', 'asc')],
      skip: 0,
    });

    expect(result).toMatchObject(operationsList);
  });

  it('should edit an operation', async () => {
    const addedOperation = await operationService.add(operation);

    const editedOperation = await operationService.edit(
      addedOperation._id.toString(),
      {
        name: 'Operation 2',
      },
    );

    operation.name = editedOperation.name;

    expect(editedOperation).toMatchObject(operation);
  });

  it('should throw an error when want to edit a non-existent operation', () => {
    const editedOperation = operationService.edit(
      new mongoose.Types.ObjectId().toString(),
      {
        name: 'Operation 2',
      },
    );

    expect(editedOperation).rejects.toThrowError(
      new NotFoundException('Operation not found'),
    );
  });

  it('should remove an operation', async () => {
    const addedOperation = await operationService.add(operation);

    await operationService.remove(addedOperation._id.toString());

    const operationsList = await operationService.getAll({
      page: 1,
      itemsPerPage: 2,
      sortBy: [new SortBy('name', 'asc')],
      skip: 0,
    });

    const result = { data: [], meta: { items: 2, page: 1, total: 0 } };

    expect(operationsList).toMatchObject(result);
  });
});
