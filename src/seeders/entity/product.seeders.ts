import ProductEntity from 'src/product/entities/product.entity';
import { DataSource } from 'typeorm';

export class ProductSeeders {
  public static async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(ProductEntity);

    const count = await productRepository.count();
    if (count) {
      console.log('product table is not empty, Seeder will not run');
      return;
    }

    const product = [
      {
        name: 'PC',
        value: 500000,
      },
      {
        name: 'Bottle',
        value: 250000,
      },
      {
        name: 'Duallsense',
        value: 45000,
      },
      {
        name: 'TV',
        value: 200000,
      },
    ];

    const productSchema = productRepository.create(product);
    await productRepository.save(productSchema);
    console.log('product seeding completed.');
  }
}
