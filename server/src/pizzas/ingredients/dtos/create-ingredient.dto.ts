import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
import mongoose from 'mongoose';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    message:
      'Ingredient name must be at least 3 characters, and max length must be less than 20 characters',
  })
  name: string;

  @IsMongoId()
  operation: mongoose.Types.ObjectId;
}
