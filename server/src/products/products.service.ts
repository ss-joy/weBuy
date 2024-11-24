import { ProductsRepository } from './products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getAllProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.productsRepository.getAllProducts(skip, limit);
  }
}
