import { IsInt, IsPositive } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateOrderDto {
  @IsInt()
  @IsPositive()
  @Optional()
  cust_id: number;

  @IsInt()
  @IsPositive()
  @Optional()
  prod_id: number;
}