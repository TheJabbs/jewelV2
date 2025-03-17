import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductImgDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  img_prio?: number;
  @IsString()
  img: string;
  @IsInt()
  @IsPositive()
  @IsOptional()
  prod_id: number;
}