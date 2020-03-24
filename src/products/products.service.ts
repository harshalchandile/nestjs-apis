import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Products') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({ title, desc, price });
    this.products.push(newProduct);

    const productData = await newProduct.save();
    return productData.id as string;
  }

  async getProducts() {
    const result = await this.productModel.find();
    return result.map(data => ({
      id: data.id,
      title: data.title,
      description: data.desc,
      price: data.price,
    }));
  }

  async getSingleProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      desc: product.desc,
      price: product.price,
    };
  }

  async updateSingleProduct(
    prodId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    let updateProduct = await this.findProduct(prodId);
    if (title) {
      updateProduct.title = title;
    }

    if (desc) {
      updateProduct.desc = desc;
    }

    if (price) {
      updateProduct.price = price;
    }

    updateProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  private async findProduct(prodId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(prodId);
    } catch (error) {
      throw new NotFoundException('Product not found');
    }

    if (!product) {
      throw new NotFoundException(
        'Product not found, returned null document by find method',
      );
    }

    return product;
  }
}
