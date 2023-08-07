import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOperationDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    message:
      'Operation name must be at least 3 characters, and max length must be less than 20 characters',
  })
  name: string;
}
