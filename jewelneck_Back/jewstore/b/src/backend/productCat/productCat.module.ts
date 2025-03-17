import { Module } from '@nestjs/common';
import { ProductCatService } from './productCat.service';
import { ProductController } from '../product/product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductCatService],
})
export class ProductCatModule {}