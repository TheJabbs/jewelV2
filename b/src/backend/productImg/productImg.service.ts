import { Injectable } from '@nestjs/common';
import { CreateProductImgDto } from './dto/createProductImg.dto';
import { UpdateProductImgDto } from './dto/updateProductImg.dto';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class ProductImgService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getAllProductImg() {
    const productImg = await this.prisma.product_img.findMany();
    return productImg;
  }

  async getProductImgById(id: number) {
    const productImg = await this.prisma.product_img.findUnique({
      where: { img_id: id },
    });
    return productImg;
  }

  async createProductImg(productImg: CreateProductImgDto) {
    const newProductImg = await this.prisma.product_img.create({
      data: productImg,
    });
    return newProductImg;
  }

  async deleteProductImg(id: number) {
    const productImg = await this.getProductImgById(id);
    if (!productImg) {
      return {
        message: 'Product image not found',
        data: null,
      };
    }
    await this.prisma.product_img.delete({
      where: { img_id: id },
    });
    return {
      message: 'Product image deleted',
      data: productImg,
    };
  }

  async updateProductImg(id: number, productImg: UpdateProductImgDto) {
    const checkProductImg = await this.getProductImgById(id);
    if (!checkProductImg) {
      return {
        message: 'Product image not found',
        data: null,
      };
    }
    await this.prisma.product_img.update({
      where: { img_id: id },
      data: productImg,
    });
    return {
      message: 'Product image updated',
      data: null,
    };
  }
}