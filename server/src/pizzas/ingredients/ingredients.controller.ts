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
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { EditIngredientDto } from './dtos/edit-ingredient.dto';
import { PageOptionsDto } from '../shared/dtos/PageMetaDtoParameters';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}
  @Get()
  getIngredients(@Query() pageOptions: PageOptionsDto) {
    return this.ingredientsService.getAll(pageOptions);
  }

  @Get('/:id')
  getIngredient(@Param('id') id: string) {
    return this.ingredientsService.getById(id);
  }

  @Post()
  addIngredient(@Body() body: CreateIngredientDto) {
    return this.ingredientsService.add(body);
  }

  @Patch('/:id')
  editIngredient(@Body() body: EditIngredientDto, @Param('id') id: string) {
    return this.ingredientsService.edit(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeIngredient(@Param('id') id: string) {
    return this.ingredientsService.remove(id);
  }
}
