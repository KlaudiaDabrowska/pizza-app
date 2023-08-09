import { CreatePizzaDto } from './create-pizza.dto';
import { PartialType } from '@nestjs/mapped-types';

export class EditPizzaDto extends PartialType(CreatePizzaDto) {}
