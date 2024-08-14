import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import 'dotenv/config';
import { join } from 'path';
import { SeedersModule } from './seeders/seeders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      migrationsRun: true,
      schema: process.env.SCHEMA ? process.env.SCHEMA : 'public',
    }),
    ProductModule,
    SeedersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
