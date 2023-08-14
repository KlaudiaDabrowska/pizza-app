import { Test } from '@nestjs/testing';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { rootMongooseTestModule } from '../../test-utils/MongooseTestModule';
import { PizzaSchema } from '../schema/pizza.schema';
import { IngredientSchema } from './schema/ingredient.schema';
import { OperationSchema } from '../operations/schema/operation.schema';
import { SortBy } from '../shared/dtos/PageMetaDtoParameters';

describe('IngredientsService', () => {
  let ingredientService: IngredientsService;

  const ingredient = {
    name: 'Ingredient 1',
    operation: null,
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
      providers: [IngredientsService],
    }).compile();
    ingredientService = module.get<IngredientsService>(IngredientsService);
  });

  it('should create an ingredient', async () => {
    const result = await ingredientService.add(ingredient);

    expect(result._id).toBeDefined();
    expect(result.name).toEqual(ingredient.name);
    expect(result.operation).toEqual(ingredient.operation);
  });

  it('should throw BadRequestException when ingredient already exists', async () => {
    const ingredient = {
      name: 'Ingredient 1',
      operation: new mongoose.Types.ObjectId(),
    };

    await ingredientService.add(ingredient);
    const secondIngredient = ingredientService.add(ingredient);

    expect(secondIngredient).rejects.toThrowError(
      new BadRequestException('Given ingredient already exists'),
    );
  });

  it('should return ingredient by id', async () => {
    const addedIngredient = await ingredientService.add(ingredient);

    const result = await ingredientService.getById(
      addedIngredient._id.toString(),
    );

    expect(result).toMatchObject(ingredient);
  });

  it('should throw an error when want to found a non-existent ingredient', () => {
    const result = ingredientService.getById(
      new mongoose.Types.ObjectId().toString(),
    );

    expect(result).rejects.toThrowError(
      new NotFoundException('Ingredient not found'),
    );
  });

  it('should return list of ingredients', async () => {
    const ingredient2 = {
      name: 'Ingredient 2',
      operation: new mongoose.Types.ObjectId(),
    };

    const addedIngredient1 = await ingredientService.add(ingredient);
    const addedIngredient2 = await ingredientService.add(ingredient2);

    const ingredientsList = {
      data: [
        {
          _id: addedIngredient1._id,
          name: 'Ingredient 1',
          __v: 0,
        },
        {
          _id: addedIngredient2._id,
          name: 'Ingredient 2',
          __v: 0,
        },
      ],
      meta: {
        page: 1,
        items: 2,
        total: 2,
      },
    };

    const result = await ingredientService.getAll({
      page: 1,
      itemsPerPage: 2,
      sortBy: [new SortBy('name', 'asc')],
      skip: 0,
    });

    expect(result).toMatchObject(ingredientsList);
  });

  it('should edit an ingredient', async () => {
    const addedIngredient = await ingredientService.add(ingredient);

    const editedIngredient = await ingredientService.edit(
      addedIngredient._id.toString(),
      {
        name: 'Ingredient 2',
      },
    );

    ingredient.name = editedIngredient.name;

    expect(editedIngredient).toMatchObject(ingredient);
  });

  it('should throw an error when want to edit a non-existent ingredient', () => {
    const editedIngredient = ingredientService.edit(
      new mongoose.Types.ObjectId().toString(),
      {
        name: 'Ingredient 2',
      },
    );

    expect(editedIngredient).rejects.toThrowError(
      new NotFoundException('Ingredient not found'),
    );
  });

  it('should remove an ingredient', async () => {
    const addedIngredient = await ingredientService.add(ingredient);

    await ingredientService.remove(addedIngredient._id.toString());

    const ingredientsList = await ingredientService.getAll({
      page: 1,
      itemsPerPage: 2,
      sortBy: [new SortBy('name', 'asc')],
      skip: 0,
    });

    const result = { data: [], meta: { items: 2, page: 1, total: 0 } };

    expect(ingredientsList).toMatchObject(result);
  });
});
