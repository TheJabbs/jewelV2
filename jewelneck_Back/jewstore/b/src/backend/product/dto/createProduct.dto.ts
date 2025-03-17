import { IsDecimal, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  prod_name: string;

  @IsString()
  @IsNotEmpty()
  prod_description: string;

  @IsDecimal()
  @IsPositive()
  cost: number;

  @IsInt()
  @IsPositive()
  cat_id: number;

  @IsString()
  prod_img: string;
}