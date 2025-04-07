import { Module } from '@nestjs/common';
import {PrismaModule} from "./prisma/prisma.module";
import {CartModule} from "./backend/cart/cart.module";
import {CustomersModule} from "./backend/customers/customers.module";
import {OrdersModule} from "./backend/orders/orders.module";
import {ProductModule} from "./backend/product/product.module";
import {ProductCatModule} from "./backend/productCat/productCat.module";
import {ProductImgModule} from "./backend/productImg/productImg.module";
import {AuthModule} from "./backend/auth/auth.module";



@Module({
  imports: [PrismaModule,  CartModule, CustomersModule, OrdersModule, ProductModule, ProductCatModule, ProductImgModule, AuthModule],
  providers: [],
})
export class AppModule {}
