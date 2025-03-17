import { IsInt, IsPositive } from 'class-validator';

export class CreateOrderDto{
  @IsInt()
  @IsPositive()
  cust_id: number;
  @IsInt()
  @IsPositive()
  prod_id: number;
}