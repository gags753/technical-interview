import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetProductIdDto } from './dto/getProductId.dto';
import { PaginationDto } from './dto/pagination.dto';
import ProductEntity from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getProducts({ id }: GetProductIdDto, pagination: PaginationDto) {
    if (id) {
      return await this.productRepository.findOne({ where: { id } });
    }
    const defaultPage = pagination.page ? pagination.page : 1;
    const defaultTake = pagination.take ? pagination.take : 5;
    const [result, totalRegisters] = await this.productRepository.findAndCount({
      take: defaultTake,
      skip: defaultTake * (defaultPage - 1),
    });

    const totalPages = Math.ceil(totalRegisters / defaultTake);
    return {
      result,
      take: defaultTake,
      page: defaultPage,
      totalPages,
    };
  }

  async createProduct(data: CreateProductDto) {
    const product = this.productRepository.create({
      name: data.name,
      value: data.value,
    });
    await this.productRepository.save(product);
  }
}
