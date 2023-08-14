import { Test } from '@nestjs/testing';
import { PizzasService } from './pizzas.service';
import mongoose from 'mongoose';
import { rootMongooseTestModule } from '../test-utils/MongooseTestModule';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzaSchema } from './schema/pizza.schema';
import { IngredientSchema } from './ingredients/schema/ingredient.schema';
import { OperationSchema } from './operations/schema/operation.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SortBy } from './shared/dtos/PageMetaDtoParameters';

describe('PizzasService', () => {
  let pizzaService: PizzasService;

  const pizza = {
    name: 'Pizza 1',
    price: 10,
    ingredients: [],
    operations: [],
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
      providers: [PizzasService],
    }).compile();
    pizzaService = module.get<PizzasService>(PizzasService);
  });

  it('should create a pizza', async () => {
    const result = await pizzaService.add(pizza);

    expect(result._id).toBeDefined();
    expect(result).toMatchObject(pizza);
  });

  it('should throw BadRequestException when pizza already exists', async () => {
    await pizzaService.add(pizza);
    const secondPizza = pizzaService.add(pizza);

    expect(secondPizza).rejects.toThrowError(
      new BadRequestException('Given pizza already exists'),
    );
  });

  it('should return pizza by id', async () => {
    const addedPizza = await pizzaService.add(pizza);

    const result = await pizzaService.getById(addedPizza._id.toString());

    expect(result).toMatchObject(pizza);
  });

  it('should throw an error when want to found a non-existent pizza', () => {
    const result = pizzaService.getById(
      new mongoose.Types.ObjectId().toString(),
    );

    expect(result).rejects.toThrowError(
      new NotFoundException('Pizza not found'),
    );
  });

  it('should return list of pizzas', async () => {
    const pizza2 = {
      name: 'Pizza 2',
      price: 20,
      ingredients: [],
      operations: [],
    };

    const addedPizza1 = await pizzaService.add(pizza);
    const addedPizza2 = await pizzaService.add(pizza2);

    const pizzasList = {
      data: [
        {
          _id: addedPizza1._id,
          name: 'Pizza 1',
          price: 10,
          __v: 0,
        },
        {
          _id: addedPizza2._id,
          name: 'Pizza 2',
          price: 20,
          __v: 0,
        },
      ],
      meta: {
        page: 1,
        items: 2,
        total: 2,
      },
    };

    const result = await pizzaService.getAll({
      page: 1,
      itemsPerPage: 2,
      sortBy: [new SortBy('name', 'asc')],
      skip: 0,
    });

    expect(result).toMatchObject(pizzasList);
  });

  it('should edit a pizza', async () => {
    const addedPizza = await pizzaService.add(pizza);

    const editedPizza = await pizzaService.edit(addedPizza._id.toString(), {
      name: 'Pizza 2',
    });

    pizza.name = editedPizza.name;

    expect(editedPizza).toMatchObject(pizza);
  });

  it('should throw an error when want to edit a non-existent pizza', () => {
    const editedPizza = pizzaService.edit(
      new mongoose.Types.ObjectId().toString(),
      {
        name: 'Pizza 2',
      },
    );

    expect(editedPizza).rejects.toThrowError(
      new NotFoundException('Pizza not found'),
    );
  });

  it('should remove a pizza', async () => {
    const addedPizza = await pizzaService.add(pizza);

    await pizzaService.remove(addedPizza._id.toString());

    const pizzasList = await pizzaService.getAll({
      page: 1,
      itemsPerPage: 2,
      sortBy: [new SortBy('name', 'asc')],
      skip: 0,
    });

    const result = { data: [], meta: { items: 2, page: 1, total: 0 } };

    expect(pizzasList).toMatchObject(result);
  });
});
