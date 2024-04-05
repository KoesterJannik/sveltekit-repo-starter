import { PrismaClient, Product } from '@prisma/client';

const db = new PrismaClient();
type ProductWithoutId = Omit<Product, 'id'>;

const products: ProductWithoutId[] = [
	{
		name: 'Product 1',
		description: 'Description of product 1',
		price: 10.99,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		name: 'Product 2',
		description: 'Description of product 2',
		price: 20.99,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		name: 'Product 3',
		description: 'Description of product 3',
		price: 30.99,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		name: 'Product 4',
		description: 'Description of product 4',
		price: 40.99,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		name: 'Product 5',
		description: 'Description of product 5',
		price: 50.99,
		createdAt: new Date(),
		updatedAt: new Date()
	}
];

async function seedProducts() {
	for (const product of products) {
		const productName = product.name;
		const doesProductExist = await db.product.findUnique({
			where: {
				name: productName
			}
		});
		if (doesProductExist) continue;
		await db.product.create({ data: product });
	}
	console.log('Products seeded');
}

seedProducts();
