import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.productsService.getAllProducts(page, limit);
  }

  @Get('search')
  searchProductByName(@Query('name') name: string) {
    return this.productsService.searchProductByName(name);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.addProduct(createProductDto);
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: string) {
    return this.productsService.deleteProductById(id);
  }

  @Patch(':id')
  updateProductById(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.updateProductById(id, createProductDto);
  }
}
