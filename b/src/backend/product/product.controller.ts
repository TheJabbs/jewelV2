import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('/api/product')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Get('/all')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Post('/create')
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }

  @Put('/update/:id')
  updateProduct(@Body() product: UpdateProductDto, @Param('id') id: number) {
    return this.productService.updateProduct(id, product);
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

}