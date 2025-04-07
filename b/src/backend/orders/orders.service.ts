import { Injectable, NotFoundException } from '@nestjs/common';
import { ResMessageInterface } from '../../shared/resMessage.interface';
import { GetAllOrdersInterface } from './interface/getAllOrders.interface';
import { CreateOrderDto } from './dto/createOrder.dto';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getAllOrders(): Promise<GetAllOrdersInterface[]> {
    const orders = await this.prisma.orders.findMany();

    if (!orders || orders.length === 0) {
      throw new NotFoundException('No orders found');
    }

    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.prisma.orders.findUnique({
      where: {order_id: id},
    });

    if (!order) {
      throw new NotFoundException('No order found');
    }

    return order;
  }

  async createOrder(order: CreateOrderDto): Promise<ResMessageInterface<any>>{
    if(await this.validate(order)){
      const newOrder = await this.prisma.orders.create({
        data: order,
      });
      return {
        message: 'Order created',
        data: newOrder
      }
    }
  }

  async deleteOrder(id: number): Promise<ResMessageInterface<any>> {
    const order = await this.getOrderById(id);

    if (!order) {
      return {
        message: 'Order not found',
        data: null
      }
    }
  }

  async updateOrder(id: number, order: CreateOrderDto): Promise<ResMessageInterface<any>> {
    const checkOrder = await this.getOrderById(id);

    if (!checkOrder) {
      return {
        message: 'Order not found',
        data: null
      }
    }

    if(await this.validate(order)){
      const updatedOrder = await this.prisma.orders.update({
        where: {order_id: id},
        data: order
      });
      return {
        message: 'Order updated',
        data: updatedOrder
      }
    }
  }

  //=======================================================================
  async validate(d:any):Promise<boolean>{
    if(d.cust_id){
      const customer = await this.prisma.customers.findUnique({
        where: {cust_id: d.cust_id}
      });
      if(!customer){
        return false
      }
    }

    if(d.prod_id){
      const product = await this.prisma.product.findUnique({
        where: {prod_id: d.prod_id}
      });
      if(!product){
        return false
      }
    }

    return true;
  }


}