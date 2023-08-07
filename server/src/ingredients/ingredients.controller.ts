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
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { EditIngredientDto } from './dtos/edit-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}
  @Get()
  getIngredients() {
    return this.ingredientsService.getAll();
  }

  @Get('/:id')
  getIngredient(@Param('id') id: string) {
    return this.ingredientsService.getById(+id);
  }

  @Post()
  addIngredient(@Body() body: CreateIngredientDto) {
    return this.ingredientsService.add(body.name);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeIngredient(@Param('id') id: string) {
    return this.ingredientsService.remove(+id);
  }

  @Patch('/:id')
  editIngredient(@Body() body: EditIngredientDto, @Param('id') id: string) {
    return this.ingredientsService.edit(+id, body.name);
  }
}
