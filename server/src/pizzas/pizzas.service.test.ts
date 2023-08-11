import { Test } from '@nestjs/testing';
import { PizzasService } from './pizzas.service';
import mongoose from 'mongoose';
import { rootMongooseTestModule } from '../test-utils/MongooseTestModule';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzaSchema } from './schema/pizza.schema';
import { IngredientSchema } from './ingredients/schema/ingredient.schema';
import { OperationSchema } from './operations/schema/operation.schema';
import { BadRequestException } from '@nestjs/common';
import { SortBy } from './shared/dtos/PageMetaDtoParameters';

describe('PizzasService', () => {
  let pizzaService: PizzasService;

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
    const pizza = {
      name: 'Pizza 1',
      price: 10,
      ingredients: [],
      operations: [],
    };

    const result = await pizzaService.add(pizza);

    expect(result._id).toBeDefined();
    expect(result).toMatchObject(pizza);
  });

  it('should throw BadRequestException when pizza already exists', async () => {
    const pizza = {
      _id: new mongoose.Types.ObjectId(),
      name: 'Pizza 1',
      price: 10,
      ingredients: [],
      operations: [],
    };

    await pizzaService.add(pizza);
    const secondPizza = pizzaService.add(pizza);

    expect(secondPizza).rejects.toThrowError(
      new BadRequestException('Given pizza already exists'),
    );
  });

  it('should return pizza by id', async () => {
    const pizza = {
      name: 'Pizza 1',
      price: 10,
      ingredients: [],
      operations: [],
    };

    const addedPizza = await pizzaService.add(pizza);

    const result = await pizzaService.getById(addedPizza._id.toString());

    expect(result).toMatchObject(pizza);
  });

  it('should return list of pizzas', async () => {
    const pizza1 = {
      name: 'Pizza 1',
      price: 10,
      ingredients: [],
      operations: [],
    };

    const pizza2 = {
      name: 'Pizza 2',
      price: 20,
      ingredients: [],
      operations: [],
    };

    const addedPizza1 = await pizzaService.add(pizza1);
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
});
