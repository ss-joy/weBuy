import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  getAllProducts(skip: number, limit: number) {
    return this.productModel
      .find()
      .select('-__v')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  getProductById(id: string) {
    return this.productModel.findById(id).exec();
  }

  addProduct(product: CreateProductDto) {
    return this.productModel.create({
      name: product.name,
      description: product.description,
      price: product.price,
      imagePath: product.imagePath,
      sellCount: 0,
      sellerId: product.sellerId,
      sellerName: product.sellerName,
      productCategory: product.productCategory,
    });
  }

  async searchProductByName(name: string) {
    return this.productModel
      .find({
        name: new RegExp(name, 'i'),
      })
      .exec();
  }
}
