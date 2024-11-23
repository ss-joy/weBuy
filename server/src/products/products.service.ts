import { ProductsRepository } from './products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getAllProducts() {
    return this.productsRepository.getAllProducts();
  }
}
