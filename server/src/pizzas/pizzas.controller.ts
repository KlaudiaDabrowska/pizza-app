import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dtos/create-pizza.dto';
import { EditPizzaDto } from './dtos/edit-pizza.dto';
import { PageOptionsDto } from './shared/dtos/PageMetaDtoParameters';

@Controller('pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}

  @Get()
  getPizzas(@Query() pageOptions: PageOptionsDto) {
    return this.pizzasService.getAll(pageOptions);
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
