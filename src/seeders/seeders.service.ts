import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductSeeders } from './entity/product.seeders';

@Injectable()
export class SeedersService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await ProductSeeders.run(this.dataSource);
  }
}
