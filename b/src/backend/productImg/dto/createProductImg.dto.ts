import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductImgDto {
  @IsNotEmpty()
  @IsNumber()
  img_prio: number;

  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsNumber()
  prod_id: number;
}