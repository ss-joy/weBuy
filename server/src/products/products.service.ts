import { Types } from 'mongoose';
import { ProductsRepository } from './products.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getAllProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.productsRepository.getAllProducts(skip, limit);
  }
  getProductById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productsRepository.getProductById(id);
  }
}
