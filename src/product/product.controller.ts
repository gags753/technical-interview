import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { GetProductIdDto } from './dto/getProductId.dto';
import { PaginationDto } from './dto/pagination.dto';

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
}
