import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductDto } from './dto/getProduct.dto';
import ProductEntity from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getProducts({ id }: GetProductDto) {
    if (id) {
      return await this.productRepository.findOne({ where: { id } });
    }
    return await this.productRepository.find();
  }
}
