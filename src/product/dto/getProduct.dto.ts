import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
