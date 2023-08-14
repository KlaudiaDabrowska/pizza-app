import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreatePizzaDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, {
    message:
      'Pizza name must be at least 5 characters, and max length must be less than 20 characters',
  })
  name: string;

  @IsNumber()
  @IsPositive()
  @Min(5)
  price: number;

  @IsArray()
  ingredients: mongoose.Types.ObjectId[];

  @IsArray()
  operations: mongoose.Types.ObjectId[];
}
