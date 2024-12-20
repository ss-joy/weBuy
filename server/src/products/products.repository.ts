import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { User } from 'src/users/users.schema';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getAllProducts(skip: number, limit: number) {
    const products = await this.productModel
      .find()
      .select('-__v')
      .populate('sellerId', '-password -__v -products')
      .skip(skip)
      .limit(limit)
      .exec();
    return products;
  }

  getProductById(id: string) {
    return this.productModel
      .findById(id)
      .select('-__v')
      .populate('sellerId', '-password -__v -products')
      .exec();
  }

  async addProduct(product: CreateProductDto) {
    if (!isValidObjectId(product.sellerId)) {
      throw new BadRequestException('invalid mongo id');
    }

    const newProduct = await this.productModel.create({
      name: product.name,
      description: product.description,
      price: product.price,
      imagePath: product.imagePath,
      sellCount: 0,
      sellerId: product.sellerId,
      productCategory: product.productCategory,
      availableCount: product.availableCount,
    });

    await this.userModel.findByIdAndUpdate(product.sellerId, {
      $push: {
        products: newProduct._id,
      },
    });

    return newProduct;
  }

  async searchProductByName(name: string) {
    return this.productModel
      .find({
        name: new RegExp(name, 'i'),
      })
      .exec();
  }

  async deleteProductById(id: string) {
    const user = await this.userModel.findOne({
      products: id,
    });
    if (!user) throw new NotFoundException('The product no longer exists');
    await this.userModel.findByIdAndUpdate(user._id, {
      $pull: {
        products: id,
      },
    });
    return this.productModel.findByIdAndDelete(id);
  }

  updateProductById(id: string, createProductDto: CreateProductDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid mongo id');
    }

    return this.productModel.findByIdAndUpdate(id, {
      productCategory: createProductDto.productCategory,
      availableCount: createProductDto.availableCount,
      description: createProductDto.description,
      name: createProductDto.name,
      imagePath: createProductDto.imagePath,
      price: createProductDto.price,
    });
  }
}
