import { Test } from '@nestjs/testing';
import { PizzasService } from './pizzas.service';
import { rootMongooseTestModule } from '../test-utils/MongooseTestModule';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzaSchema } from './schema/pizza.schema';
import { IngredientSchema } from './ingredients/schema/ingredient.schema';
import { OperationSchema } from './operations/schema/operation.schema';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PizzasController } from './pizzas.controller';
import { CreatePizzaDto } from './dtos/create-pizza.dto';
import * as request from 'supertest';

describe('PizzasController', () => {
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
      controllers: [PizzasController],
      providers: [PizzasService],
    }).compile();
    // pizzaController = module.get<PizzasController>(PizzasController);

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  }, 10000);

  it('should create a pizza', async () => {
    const result = await addPizza(app);

    const expectedPizza = {
      name: 'pizza',
      price: 20,
    };

    expect(result).toMatchObject(expectedPizza);
  });

  it('should return pizza by id', async () => {
    const addedPizza = await addPizza(app);

    return request(app.getHttpServer())
      .get(`/pizzas/${addedPizza._id}`)
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toEqual(addedPizza);
      });
  });

  it('should return list of pizzas', async () => {
    await addPizza(app);

    const expectedPizza = {
      name: 'pizza',
      price: 20,
    };

    return request(app.getHttpServer())
      .get('/pizzas')
      .query({
        page: 1,
        itemsPerPage: 2,
        sortBy: 'name:asc',
      })
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toMatchObject({
          data: [expectedPizza],
          meta: {},
        });
      });
  });

  it('should edit a pizza', async () => {
    const addedPizza = await addPizza(app);

    await request(app.getHttpServer())
      .patch(`/pizzas/${addedPizza._id}`)
      .send({ id: addedPizza._id, name: 'Pizza 2' })
      .expect(200);

    const getPizzaById = await request(app.getHttpServer())
      .get(`/pizzas/${addedPizza._id}`)
      .expect(200)
      .then((response) => response.body);

    expect(getPizzaById.name).toEqual('Pizza 2');
  });

  it('should remove a pizza', async () => {
    const addedPizza = await addPizza(app);

    await request(app.getHttpServer())
      .delete(`/pizzas/${addedPizza._id}`)
      .expect(204);
  });
});

const addPizza = async (
  app: INestApplication,
  addPizzaRequest: CreatePizzaDto = {
    name: 'pizza',
    price: 20,
    operations: [],
    ingredients: [],
  },
) => {
  return await request(app.getHttpServer())
    .post('/pizzas')
    .send(addPizzaRequest)
    .expect(201)
    .then((response) => response.body);
};
