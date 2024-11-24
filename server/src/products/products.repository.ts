import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';

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
}
