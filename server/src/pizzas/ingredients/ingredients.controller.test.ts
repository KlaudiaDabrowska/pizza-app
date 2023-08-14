import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { rootMongooseTestModule } from '../../test-utils/MongooseTestModule';
import { PizzaSchema } from '../schema/pizza.schema';
import { IngredientSchema } from './schema/ingredient.schema';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import mongoose from 'mongoose';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { OperationSchema } from '../operations/schema/operation.schema';
import { OperationsService } from '../operations/operations.service';
import { OperationsController } from '../operations/operations.controller';
import { CreateOperationDto } from '../operations/dtos/create-operation.dto';

describe('IngredientsController', () => {
  let app: INestApplication;

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
      controllers: [IngredientsController, OperationsController],
      providers: [IngredientsService, OperationsService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  }, 10000);

  it('should create an ingredient', async () => {
    const result = await addIngredient(app);

    const expectedIngredient = {
      name: 'ingredient',
    };

    expect(result).toMatchObject(expectedIngredient);
  });

  it('should create an ingredient with associated operation', async () => {
    const operation = await addOperation(app);
    const ingredientToAdd = {
      name: 'tomato',
      operation: operation._id,
    };

    const result = await addIngredient(app, ingredientToAdd);

    expect(result._id).toBeDefined();
    expect(result.name).toEqual(ingredientToAdd.name);
    expect(result.operation).toEqual(operation);
  });

  it('should return ingredient by id', async () => {
    const addedIngredient = await addIngredient(app);
    const expectedIngredient = {
      _id: addedIngredient._id,
      name: addedIngredient.name,
      pizzas: [],
      operation: addedIngredient.operation,
    };

    return request(app.getHttpServer())
      .get(`/ingredients/${addedIngredient._id}`)
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toEqual(expectedIngredient);
      });
  });

  it('should return list of ingredients', async () => {
    await addIngredient(app);

    const expectedIngredient = {
      name: 'ingredient',
    };

    return request(app.getHttpServer())
      .get('/ingredients')
      .query({
        page: 1,
        itemsPerPage: 2,
        sortBy: 'name:asc',
      })
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toMatchObject({
          data: [expectedIngredient],
          meta: {},
        });
      });
  });

  it('should edit an ingredient', async () => {
    const addedIngredient = await addIngredient(app);

    await request(app.getHttpServer())
      .patch(`/ingredients/${addedIngredient._id}`)
      .send({ id: addedIngredient._id, name: 'Ingredient 2' })
      .expect(200);

    const getIngredientById = await request(app.getHttpServer())
      .get(`/ingredients/${addedIngredient._id}`)
      .expect(200)
      .then((response) => response.body);

    expect(getIngredientById.name).toEqual('Ingredient 2');
  });

  it('should remove an ingredient', async () => {
    const addedIngredient = await addIngredient(app);

    await request(app.getHttpServer())
      .delete(`/ingredients/${addedIngredient._id}`)
      .expect(204);
  });
});

const addIngredient = async (
  app: INestApplication,
  addIngredientRequest: CreateIngredientDto = {
    name: 'ingredient',
    operation: new mongoose.Types.ObjectId(),
  },
) => {
  return await request(app.getHttpServer())
    .post('/ingredients')
    .send(addIngredientRequest)
    .expect(201)
    .then((response) => response.body);
};

const addOperation = async (
  app: INestApplication,
  addIngredientRequest: CreateOperationDto = {
    name: 'operation',
  },
) => {
  return await request(app.getHttpServer())
    .post('/operations')
    .send(addIngredientRequest)
    .expect(201)
    .then((response) => response.body);
};
