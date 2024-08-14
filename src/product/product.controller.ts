import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetProductIdDto } from './dto/getProductId.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ProductIdDto } from './dto/productId.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@ApiTags('Produto')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id?')
  @ApiOperation({
    summary: 'Buscar produtos',
    description:
      'Busca todos os produtos ou somente um de acordo com o id passado',
  })
  async getProducts(
    @Param(new ValidationPipe({ transform: true })) id: GetProductIdDto,
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto,
  ) {
    return await this.productService.getProducts(id, pagination);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar produto',
    description: 'Criação de um produto novo no sistema',
  })
  async createProduct(@Body() data: CreateProductDto) {
    await this.productService.createProduct(data);
  }

  @Patch('/:id?')
  @ApiOperation({
    summary: 'Edita produto',
    description: 'Edita um produto a partir de um id',
  })
  async updateProduct(
    @Param(new ValidationPipe({ transform: true })) id: ProductIdDto,
    @Body() data: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, data);
  }
}
