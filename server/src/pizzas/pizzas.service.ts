import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreatePizzaDto } from './dtos/create-pizza.dto';
import { Pizza } from './schema/pizza.schema';
import { Ingredient } from 'src/pizzas/ingredients/schema/ingredient.schema';
import { Operation } from './operations/schema/operation.schema';
import { EditPizzaDto } from './dtos/edit-pizza.dto';
import { PageOptionsDto } from './shared/dtos/PageMetaDtoParameters';
import { PageDto } from './shared/dtos/PageDto';

export interface IPizza {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
}

export interface IPizzaWithRelated extends IPizza {
  ingredients: Ingredient[];
  operations: Operation[];
}

@Injectable()
export class PizzasService {
  constructor(
    @InjectModel('Pizza') private pizzaModel: mongoose.Model<Pizza>,
    @InjectModel('Ingredient')
    private ingredientModel: mongoose.Model<Ingredient>,
    @InjectModel('Operation') private operationModel: mongoose.Model<Operation>,
  ) {}

  async getAll(pageOptions: PageOptionsDto): Promise<PageDto<IPizza>> {
    const sortBy = pageOptions.sortBy.reduce((result, sortBy) => {
      const key = sortBy.field;
      result[key] = sortBy.direction;
      return result;
    }, {});

    const data = await this.pizzaModel
      .find()
      .select('-ingredients')
      .select('-operations')
      .sort(sortBy)
      .skip(pageOptions.skip)
      .limit(pageOptions.itemsPerPage);

    const total = await this.pizzaModel.countDocuments();

    return {
      data,
      meta: {
        page: pageOptions.page,
        items: pageOptions.itemsPerPage,
        total,
      },
    };
  }

  async getById(id: string): Promise<IPizzaWithRelated> {
    const pizza = await this.pizzaModel
      .findById(id)
      .populate({ path: 'ingredients', select: '-operation' })
      .populate({ path: 'operations' });

    if (!pizza) throw new NotFoundException('Pizza not found');

    return pizza;
  }

  async add(createPizzaDto: CreatePizzaDto): Promise<IPizzaWithRelated> {
    try {
      const ingredients = await this.ingredientModel.find({
        _id: { $in: createPizzaDto.ingredients },
      });

      const operations = await this.operationModel.find({
        _id: { $in: createPizzaDto.operations },
      });

      const newPizza = await this.pizzaModel.create({
        ...createPizzaDto,
        ingredients,
        operations,
      });

      return newPizza.save();
    } catch (err) {
      if (err.name === 'MongoServerError' && err?.code === 11000) {
        throw new BadRequestException('Given pizza already exists');
      }
      throw err;
    }
  }

  async edit(id: string, editPizzaDto: EditPizzaDto): Promise<IPizza> {
    const updatedPizza = await this.pizzaModel
      .findByIdAndUpdate(
        id,
        {
          ...editPizzaDto,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .populate({ path: 'ingredients', select: '-operation' })
      .populate({ path: 'operations' });

    if (!updatedPizza) throw new NotFoundException('Pizza not found');

    return updatedPizza;
  }

  async remove(id: string): Promise<IPizza> {
    return await this.pizzaModel.findByIdAndRemove(id);
  }
}
