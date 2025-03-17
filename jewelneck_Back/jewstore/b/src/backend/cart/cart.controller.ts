import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCart.dto';

@Controller('/api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/all')
  getAllCrates() {
    return this.cartService.getAllCrates();
  }

  @Get('/:id')
  getCartById(@Param('id') id: number) {
    return this.cartService.getCartById(id);
  }

  @Post('/create')
  createCart(@Body() cart: CreateCartDto) {
    return this.cartService.createCart(cart);
  }

  @Put('/update/:id')
  updateCart(@Body() cart: CreateCartDto, @Param('id') id: number) {
    return this.cartService.updateCart(id, cart);
  }

  @Delete('/delete/:id')
  deleteCart(@Param('id') id: number) {
    return this.cartService.deleteCart(id);
  }
}