import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomersDto } from './dto/createCustomers.dto';
import { UpdateCustomersDto } from './dto/updateCustomers.dto';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/all')
  getAllCustomers() {
    return this.customersService.getAllCustomers();
  }

  @Get('/:id')
  getCustomerById(@Param('id') id: number) {
    return this.customersService.getCustomerById(id);
  }

  @Post('/create')
  createCustomer(@Body() customer: CreateCustomersDto) {
    return this.customersService.createCustomer(customer);
  }

  @Put('/update/:id')
  updateCustomer(@Body() customer: UpdateCustomersDto, @Param('id') id: number) {
    return this.customersService.updateCustomer(id, customer);
  }

  @Delete('/delete/:id')
  deleteCustomer(@Param('id') id: number) {
    return this.customersService.deleteCustomer(id);
  }
}