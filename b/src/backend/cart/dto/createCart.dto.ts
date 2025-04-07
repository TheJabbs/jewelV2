import { IsInt, IsPositive } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  @IsPositive()
  prod_id: number;

  @IsInt()
  @IsPositive()
  cust_id: number;
}
