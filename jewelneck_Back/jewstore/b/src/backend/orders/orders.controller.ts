import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@Controller('/api/cart')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/all')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: number) {
    return this.ordersService.getOrderById(id);
  }

  @Post('/create')
  createOrder(@Body() order: CreateOrderDto) {
    return this.ordersService.createOrder(order);
  }

  @Put('/update/:id')
  updateOrder(@Body() order: UpdateOrderDto, @Param('id') id: number) {
    return this.ordersService.updateOrder(id, order);
  }

  @Delete('/delete/:id')
  deleteOrder(@Param('id') id: number) {
    return this.ordersService.deleteOrder(id);
  }
}