import { IsInt, IsPositive } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateCartDto {
  @IsInt()
  @IsPositive()
  @Optional()
  prod_id?: number;

  @IsInt()
  @IsPositive()
  @Optional()
  cust_id?: number;
}
