import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCartDto } from './dto/createCart.dto';
import { ResMessageInterface } from '../../shared/resMessage.interface';
import { GetAllCartInterface } from './interface/getAllCart.interface';
import { UpdateCartDto } from './dto/updateCart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getAllCrates(): Promise<GetAllCartInterface[]> {
    const crates = await this.prisma.cart.findMany();
    if(!crates || crates.length === 0) {
      throw new NotFoundException('No crates found');
    }
    return crates;
  }

  async getCartById(id: number): Promise<GetAllCartInterface> {
    const cart = await this.prisma.cart.findUnique({
      where: {cart_id: id},
    });
    if(!cart) {
      throw new NotFoundException('No cart found');
    }
    return cart;
  }

  async createCart(cart: CreateCartDto): Promise<ResMessageInterface<any>> {
    if(!await this.validate(cart)) {
      const newCart = await this.prisma.cart.create({
        data: {
          prod_id: cart.prod_id,
          cust_id: cart.cust_id,
          created: new Date()
        },
      });
      return {
        message: 'Cart created',
        data: newCart
      }
    }else{
      return {
        message: 'Cart not created'
      }
    }
  }

  async deleteCart(id: number): Promise<ResMessageInterface<any>> {
    const cart = await this.getCartById(id);
    if(!cart) {
      return {
        message: 'Cart not found',
        data: null
      }
    }
  }

  async updateCart(id: number, cart: UpdateCartDto): Promise<ResMessageInterface<any>> {
    const checkCart = await this.getCartById(id);
    if(!checkCart) {
      return {
        message: 'Cart not found',
        data: null
      }
    }

    if(!await this.validate(cart)) {
      const updatedCart = await this.prisma.cart.update({
        where: { cart_id: id },
        data: cart,
      });
      return {
        message: 'Cart updated',
        data: updatedCart
      }
    }
  }

  //==============================================
  async validate(d) : Promise<Boolean>{
    if(d.cust_id){
      const checkCust = await this.prisma.customers.findUnique({
        where: {cust_id: d.cust_id},
      })

      if(!checkCust){
        return false
      }
    }

    if(d.prod_id){
      const checkProd = await this.prisma.product.findUnique({
        where: {prod_id: d.prod_id},
      })

      if(!checkProd){
        return false
      }
    }
  }
}