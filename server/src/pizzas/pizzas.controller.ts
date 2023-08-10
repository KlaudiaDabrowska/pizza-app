import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dtos/create-pizza.dto';
import { EditPizzaDto } from './dtos/edit-pizza.dto';

@Controller('pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}

  @Get()
  getPizzas() {
    return this.pizzasService.getAll();
  }

  @Get('/:id')
  getPizza(@Param('id') id: string) {
    return this.pizzasService.getById(id);
  }

  @Post()
  addPizza(@Body() body: CreatePizzaDto) {
    return this.pizzasService.add(body);
  }

  @Patch('/:id')
  editPizza(@Body() body: EditPizzaDto, @Param('id') id: string) {
    return this.pizzasService.edit(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  removePizza(@Param('id') id: string) {
    return this.pizzasService.remove(id);
  }
}
