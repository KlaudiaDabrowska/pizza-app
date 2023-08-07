import { IsNumber, IsPositive, Min } from 'class-validator';

export class EditPizzaDto {
  @IsNumber()
  @IsPositive()
  @Min(5)
  price: number;
}
