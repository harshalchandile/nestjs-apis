import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdSchema } from './products.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProdSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
