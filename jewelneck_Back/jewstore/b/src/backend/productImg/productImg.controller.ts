import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { UpdateProductImgDto } from './dto/updateProductImg.dto';
import { ProductImgService } from './productImg.service';
import { CreateProductImgDto } from './dto/createProductImg.dto';

@Controller('/api/productImg')
export class ProductImgController{
  constructor(private readonly productImgService: ProductImgService) {}

  @Get('/all')
  getAllProductImg() {
    return this.productImgService.getAllProductImg();
  }

  @Get('/:id')
  getProductImgById(@Param('id') id: number) {
    return this.productImgService.getProductImgById(id);
  }

  @Post('/create')
  createProductImg(@Body() productImg: CreateProductImgDto) {
    return this.productImgService.createProductImg(productImg);
  }

  @Put('/update/:id')
  updateProductImg(@Param('id') id: number, @Body() productImg: UpdateProductImgDto) {
    return this.productImgService.updateProductImg(id, productImg);
  }

  @Delete('/delete/:id')
  deleteProductImg(@Param('id') id: number) {
    return this.productImgService.deleteProductImg(id);
  }
}