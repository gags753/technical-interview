import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { GetProductDto } from './dto/getProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id?')
  async getProducts(
    @Param(new ValidationPipe({ transform: true })) id: GetProductDto,
  ) {
    return await this.productService.getProducts(id);
  }
}
