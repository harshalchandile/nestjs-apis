import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProducts(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getSingleProduct(@Param('id') prodId: string) {
    return await this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateAProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productService.updateSingleProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
}
