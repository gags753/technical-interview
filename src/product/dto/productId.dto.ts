import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ProductIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
