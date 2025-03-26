import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { ProductCatService } from './productCat.service';

@Controller('/api/productCat')
export class ProductCatController{
  constructor(private readonly productCatService: ProductCatService) {}

  @Get('/all')
  getAllProductCats() {
    return this.productCatService.getAllProductCats();
  }

  @Get('/:id')
  getProductCatById(@Param('id') id: number) {
    return this.productCatService.getProductCatById(id);
  }

  @Post('/create/:cat')
  createProductCat(@Param('cat') productCat: string) {
    return this.productCatService.createProductCat(productCat);
  }

  @Put('/update/:id/:cat')
  updateProductCat(@Param('cat') productCat: string, @Param('id') id: number) {
    return this.productCatService.updateProductCat(id, productCat);
  }

  @Delete('/delete/:id')
  deleteProductCat(@Param('id') id: number) {
    return this.productCatService.deleteProductCat(id);
  }
}