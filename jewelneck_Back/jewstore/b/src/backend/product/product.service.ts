import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetAllProductInterface } from './interface/GetAllProduct.interface';
import { CreateProductDto } from './dto/createProduct.dto';
import { ResMessageInterface } from '../../shared/resMessage.interface';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaClient) {
  }

  async getAllProducts(): Promise<GetAllProductInterface[]> {
    const products = await this.prisma.product.findMany(
      {
        select: {
          prod_id: true,
          prod_name: true,
          cost: true,
          prod_description: true,
          prod_img: true,
          cat_id: true,
          created: true,
          product_img: {
            select: {
              img_id: true,
              img_prio: true,
              img: true
            },
          },
        },
      },
    );

    if (!products || products.length === 0) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  async getProductById(id: number): Promise<GetAllProductInterface> {
    const product = await this.prisma.product.findUnique({
      where: { prod_id: id },
      select: {
        prod_id: true,
        prod_name: true,
        cost: true,
        prod_description: true,
        prod_img: true,
        cat_id: true,
        created: true,
        product_img: {
          select: {
            img_id: true,
            img_prio: true,
            img: true
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('No product found');
    }

    return product;
  }

  async createProduct(product: CreateProductDto): Promise<ResMessageInterface<any>> {
    if (await this.validate(product)) {
      const newProduct = await this.prisma.product.create({
        data: product,
      });
      return {
        message: 'Product created',
        data: newProduct,
      };
    }
  }

  async deleteProduct(id: number): Promise<ResMessageInterface<any>> {
    const product = await this.getProductById(id);

    if (!product) {
      return {
        message: 'Product not found',
        data: null,
      };
    }

    await this.prisma.product.delete({
      where: { prod_id: id },
    });

    return {
      message: 'Product deleted',
      data: null,
    };
  }

  async updateProduct(id: number, product: UpdateProductDto): Promise<ResMessageInterface<any>> {
    const checkProduct = await this.getProductById(id);

    if (!checkProduct) {
      return {
        message: 'Product not found',
        data: null,
      };
    }

    if (await this.validate(product)) {
      await this.prisma.product.update({
        where: { prod_id: id },
        data: product,
      });
      return {
        message: 'Product updated',
        data: null,
      };
    }
  }


  //==================================================
  async validate(product: any): Promise<boolean> {
    if (product.cat_id) {
      const category = await this.prisma.product_cat.findUnique({
        where: { cat_id: product.cat_id },
      });
      if (!category) {
        return false;
      }
    }

    return true;
  }


}