import { Module } from '@nestjs/common';
import { ProductCatService } from './productCat.service';
import { ProductController } from '../product/product.controller';
import {ProductCatController} from "./productCat.controller";

@Module({
  imports: [],
  controllers: [ProductCatController],
  providers: [ProductCatService],
})
export class ProductCatModule {}