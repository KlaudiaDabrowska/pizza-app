import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { rootMongooseTestModule } from '../../test-utils/MongooseTestModule';
import { PizzaSchema } from '../schema/pizza.schema';
import { IngredientSchema } from '../ingredients/schema/ingredient.schema';
import { OperationSchema } from './schema/operation.schema';
import { CreateOperationDto } from './dtos/create-operation.dto';

describe('OperationsController', () => {
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
      controllers: [OperationsController],
      providers: [OperationsService],
    }).compile();
    // pizzaController = module.get<PizzasController>(PizzasController);

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  }, 10000);

  it('should create an operation', async () => {
    const result = await addOperation(app);

    const expectedOperation = {
      name: 'operation',
    };

    expect(result).toMatchObject(expectedOperation);
  });

  it('should return operation by id', async () => {
    const addedOperation = await addOperation(app);
    const expectedOperation = {
      _id: addedOperation._id,
      name: addedOperation.name,
      pizzas: [],
      ingredients: [],
    };

    return request(app.getHttpServer())
      .get(`/operations/${addedOperation._id}`)
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toEqual(expectedOperation);
      });
  });

  it('should return list of operations', async () => {
    await addOperation(app);

    const expectedOperation = {
      name: 'operation',
    };

    return request(app.getHttpServer())
      .get('/operations')
      .query({
        page: 1,
        itemsPerPage: 2,
        sortBy: 'name:asc',
      })
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toMatchObject({
          data: [expectedOperation],
          meta: {},
        });
      });
  });

  it('should edit an operation', async () => {
    const addedOperation = await addOperation(app);

    await request(app.getHttpServer())
      .patch(`/operations/${addedOperation._id}`)
      .send({ id: addedOperation._id, name: 'Operation 2' })
      .expect(200);

    const getOperationById = await request(app.getHttpServer())
      .get(`/operations/${addedOperation._id}`)
      .expect(200)
      .then((response) => response.body);

    expect(getOperationById.name).toEqual('Operation 2');
  });

  it('should remove an operation', async () => {
    const addedOperation = await addOperation(app);

    await request(app.getHttpServer())
      .delete(`/operations/${addedOperation._id}`)
      .expect(204);
  });
});

const addOperation = async (
  app: INestApplication,
  addOperationRequest: CreateOperationDto = {
    name: 'operation',
  },
) => {
  return await request(app.getHttpServer())
    .post('/operations')
    .send(addOperationRequest)
    .expect(201)
    .then((response) => response.body);
};
