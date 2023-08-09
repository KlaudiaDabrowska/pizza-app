import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from './create-ingredient.dto';

export class EditIngredientDto extends PartialType(CreateIngredientDto) {}
