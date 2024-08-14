import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { GetProductDto } from './dto/getProduct.dto';

@Controller('product')
export class ProductController {
  @Get('/:id?')
  async getProduct(
    @Param(new ValidationPipe({ transform: true })) id: GetProductDto,
  ) {
    return id;
  }
}
