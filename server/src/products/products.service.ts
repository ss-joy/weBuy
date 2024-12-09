import { Types } from 'mongoose';
import { ProductsRepository } from './products.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getAllProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.productsRepository.getAllProducts(skip, limit);
  }

  getProductById(id: string) {
    if (!id) {
      throw new BadRequestException('Id is must');
    }
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productsRepository.getProductById(id);
  }

  async addProduct(product: CreateProductDto) {
    return this.productsRepository.addProduct(product);
  }

  searchProductByName(name: string) {
    return this.productsRepository.searchProductByName(name);
  }

  deleteProductById(id: string) {
    return this.productsRepository.deleteProductById(id);
  }
  updateProductById(id: string, createProductDto: CreateProductDto) {
    return this.productsRepository.updateProductById(id, createProductDto);
  }
}
