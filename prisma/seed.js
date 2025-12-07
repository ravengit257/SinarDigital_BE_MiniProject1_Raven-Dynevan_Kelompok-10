import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Seed Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Action',
        description: 'Electronic devices and gadgets',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Comedy',
        description: 'Clothing and accessories',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Romance',
        description: 'Books and educational materials',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Animated',
        description: 'Furniture and home decorations',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Thriller',
        description: 'Sports equipment and accessories',
      },
    }),
  ]);

  console.log('✅ Categories created:', categories.length);

  const products = [
  
    { name: 'Frozen', description: 'High-performance gaming laptop with RTX 4060',  categoryId: categories[3].id },
    { name: 'Moana', description: 'Latest Apple smartphone with A17 chip', categoryId: categories[3].id },
    { name: 'Barbie"', description: '4K QLED Smart TV with HDR', categoryId: categories[2].id },
    { name: 'The Hunger Games', description: 'Premium noise-cancelling headphones',  categoryId: categories[0].id },
    { name: 'Avengers', description: 'Powerful tablet for work and entertainment', categoryId: categories[0].id },

  
    { name: 'Iron Man', description: 'Comfortable running shoes',  categoryId: categories[0].id },
    { name: 'Transformers', description: 'Classic denim jeans',  categoryId: categories[0].id },
    { name: 'Zootopia', description: 'Warm and stylish hoodie',  categoryId: categories[3].id },
    { name: 'Minions', description: 'Iconic sunglasses design',  categoryId: categories[3].id },
    { name: 'Toy Story', description: 'Hybrid smartwatch with classic design', categoryId: categories[3].id },

  
    { name: 'John Wick', description: 'A handbook of agile software craftsmanship',  categoryId: categories[0].id },
    { name: 'Coco', description: 'Your journey to mastery',  categoryId: categories[3].id },
    { name: 'Inside Out', description: 'Elements of reusable object-oriented software', categoryId: categories[3].id },
    { name: 'Wonder Woman ', description: 'Deep dive into JavaScript',  categoryId: categories[0].id },
    { name: 'Black Panther', description: 'Tiny changes, remarkable results', categoryId: categories[0].id },



  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Products created:', products.length);
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });