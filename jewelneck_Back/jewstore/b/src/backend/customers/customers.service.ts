import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetAllCustomersInterface } from './interface/getAllCustomers.interface';
import { ResMessageInterface } from '../../shared/resMessage.interface';
import { CreateCustomersDto } from './dto/createCustomers.dto';
import { UpdateCustomersDto } from './dto/updateCustomers.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getAllCustomers(): Promise<GetAllCustomersInterface[]> {
    const customers = await this.prisma.customers.findMany({
      select: {
        cust_id: true,
        username: true,
        email: true,
        phone: true,
        cart: {
          select: {
            cart_id: true,
            prod_id: true,
            created: true,
          },
        },
        orders: {
          select: {
            order_id: true,
            prod_id: true,
            created: true,
          },
        }
      },
    });

    if(!customers || customers.length === 0) {
      throw new NotFoundException('No customers found');
    }

    return customers;
  }

  async getCustomerById(id: number): Promise<GetAllCustomersInterface> {
    const customer = await this.prisma.customers.findUnique({
      where: {cust_id: id},
      select: {
        cust_id: true,
        username: true,
        email: true,
        phone: true,
        cart: {
          select: {
            cart_id: true,
            prod_id: true,
            created: true,
          },
        },
        orders: {
          select: {
            order_id: true,
            prod_id: true,
            created: true,
          },
        }
      },
    });

    if(!customer) {
      throw new NotFoundException('No customer found');
    }

    return customer;
  }

  async createCustomer(customer: CreateCustomersDto): Promise<ResMessageInterface<any>> {
    if(await this.validate(customer) && await this.validateUniqueness(customer)) {
      const newCustomer = await this.prisma.customers.create({
        data: customer
      });
      return {
        message: 'Customer created',
        data: newCustomer
      }
    }else{
      return {
        message: 'Customer not created'
      }
    }
  }

  async deleteCustomer(id: number): Promise<ResMessageInterface<any>> {
    const customer = await this.getCustomerById(id);
    if(!customer) {
      return {
        message: 'Customer not found',
        data: null
      }
    }
  }

  async updateCustomer(id: number, customer: UpdateCustomersDto): Promise<ResMessageInterface<any>> {
    const checkCustomer = await this.getCustomerById(id);
    if(!checkCustomer) {
      return {
        message: 'Customer not found',
        data: null
      }
    }

    if(await this.validate(customer) && await this.validateUniqueness(customer)) {
      const updatedCustomer = await this.prisma.customers.update({
        where: {cust_id: id},
        data: customer
      });
      return {
        message: 'Customer updated',
        data: updatedCustomer
      }
    }
  }


  //===================================================================================
  private async validate(d: any) {
    if(d.cust_id) {
      const checkCust = await this.prisma.customers.findUnique({
        where: {cust_id: d.cust_id}
      });
      if(!checkCust) {
        return false;
      }
    }

    if(d.prod_id){
      const checkProd = await this.prisma.product.findUnique({
        where: {prod_id: d.prod_id}
      });
      if(!checkProd) {
        return false;
      }
    }
    return true;
  }

  async validateUniqueness(d: any) {
    if(d.username) {
      const checkUsername = await this.prisma.customers.findFirst({
        where: {username: d.username}
      });
      if(checkUsername) {
        return false;
      }
    }

    if(d.email) {
      const checkEmail = await this.prisma.customers.findUnique({
        where: {email: d.email}
      });
      if(checkEmail) {
        return false;
      }
    }
    return true;
  }
}