import {IsDecimal, IsInt, IsNotEmpty, IsNumber, isNumber, IsPositive, IsString} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  prod_name: string;

  @IsString()
  @IsNotEmpty()
  prod_description: string;

  @IsDecimal()
  cost: number;

  @IsNumber()
  cat_id: number;

  @IsString()
  prod_img: string;
}