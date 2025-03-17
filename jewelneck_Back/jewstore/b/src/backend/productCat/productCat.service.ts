import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAllProductCatInterface } from './interface/createAllProductCat.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductCatService{
  constructor(private readonly prisma: PrismaService) {}

  async getAllProductCats() : Promise<GetAllProductCatInterface[]>{
    const productCats = await this.prisma.product_cat.findMany();

    if(!productCats || productCats.length === 0){
      throw new NotFoundException('No product categories found');
    }

    return productCats;
  }

  async getProductCatById(id: number) : Promise<GetAllProductCatInterface>{
    const productCat = await this.prisma.product_cat.findUnique({
      where: {cat_id: id},
    });

    if(!productCat){
      throw new NotFoundException('No product category found');
    }

    return productCat;
  }

  async createProductCat(productCat: string){
    const newProductCat = await this.prisma.product_cat.create({
      data: {
        cat_name: productCat,
      },
    });

    return newProductCat;
  }

  async updateProductCat(id: number, productCat: string){
    const updatedProductCat = await this.prisma.product_cat.update({
      where: {cat_id: id},
      data: {
        cat_name: productCat,
      },
    });

    return updatedProductCat;
  }

  async deleteProductCat(id: number){
    const productCat = await this.getProductCatById(id);

    if(!productCat){
      return {
        message: 'Product category not found',
        data: null,
      };
    }

    await this.prisma.product_cat.delete({
      where: {cat_id: id},
    });

    return {
      message: 'Product category deleted',
      data: null,
    };
  }
}