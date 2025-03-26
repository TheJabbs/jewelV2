import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto{
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  prod_name?: string;

  @IsString()
  @IsNotEmpty()
  prod_description?: string;

  @IsDecimal()
  @IsPositive()
  @IsOptional()
  cost: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  cat_id?: number;

  @IsString()
  @IsOptional()
  prod_img?: string;
}