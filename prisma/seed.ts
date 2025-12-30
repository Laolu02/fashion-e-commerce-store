import { config } from 'dotenv';
config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Start seeding...');

  // Clear existing data (optional - be careful in production!)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'USER',
    },
  });

  console.log('✅ Created users');

  // Create Products
  const products = await Promise.all([
    // MEN'S PRODUCTS
    prisma.product.create({
      data: {
        name: 'Classic White T-Shirt',
        description: 'Comfortable cotton t-shirt perfect for everyday wear',
        price: 350000, // ₦3,500 in kobo
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        category: 'MEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Slim Fit Blue Jeans',
        description: 'Modern slim fit jeans with stretch comfort',
        price: 1200000, // ₦12,000 in kobo
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        category: 'MEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Black Polo Shirt',
        description: 'Premium cotton polo shirt with modern fit',
        price: 450000, // ₦4,500
        imageUrl: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99',
        category: 'MEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cargo Pants - Khaki',
        description: 'Durable cargo pants with multiple pockets',
        price: 950000, // ₦9,500
        imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
        category: 'MEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Leather Jacket',
        description: 'Classic leather jacket for a bold statement',
        price: 2500000, // ₦25,000
        imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
        category: 'MEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Checked Flannel Shirt',
        description: 'Comfortable flannel shirt perfect for casual wear',
        price: 550000, // ₦5,500
        imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
        category: 'MEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Athletic Shorts',
        description: 'Breathable sports shorts for active lifestyle',
        price: 320000, // ₦3,200
        imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b',
        category: 'MEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Formal White Shirt',
        description: 'Crisp white shirt for professional occasions',
        price: 650000, // ₦6,500
        imageUrl: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1',
        category: 'MEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Black Chinos',
        description: 'Versatile chinos for smart-casual look',
        price: 850000, // ₦8,500
        imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
        category: 'MEN',
      },
    }),

    // WOMEN'S PRODUCTS
    prisma.product.create({
      data: {
        name: 'Summer Floral Dress',
        description: 'Light and breezy floral summer dress',
        price: 700000, // ₦7,000
        imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
        category: 'WOMEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Elegant Evening Gown',
        description: 'Stunning evening gown for special occasions',
        price: 1800000, // ₦18,000
        imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae',
        category: 'WOMEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Casual Denim Skirt',
        description: 'Classic denim skirt for everyday style',
        price: 450000, // ₦4,500
        imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
        category: 'WOMEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Silk Blouse - Cream',
        description: 'Luxurious silk blouse with elegant drape',
        price: 950000, // ₦9,500
        imageUrl: 'https://images.unsplash.com/photo-1564257577689-5cd5e8e4d53c',
        category: 'WOMEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'High-Waisted Jeans',
        description: 'Trendy high-waisted jeans with perfect fit',
        price: 850000, // ₦8,500
        imageUrl: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec',
        category: 'WOMEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Knit Cardigan',
        description: 'Cozy knit cardigan for layering',
        price: 650000, // ₦6,500
        imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
        category: 'WOMEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Pleated Midi Skirt',
        description: 'Elegant pleated skirt for versatile styling',
        price: 550000, // ₦5,500
        imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
        category: 'WOMEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wrap Dress - Navy',
        description: 'Flattering wrap dress in navy blue',
        price: 780000, // ₦7,800
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
        category: 'WOMEN',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Linen Pants',
        description: 'Breathable linen pants for summer comfort',
        price: 620000, // ₦6,200
        imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
        category: 'WOMEN',
      },
    }),

    // ACCESSORIES
    prisma.product.create({
      data: {
        name: 'Black Hoodie',
        description: 'Warm and cozy hoodie with front pocket',
        price: 800000, // ₦8,000
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
        category: 'ACCESSORIES',
      },
    }),
    prisma.product.create({
      data: {
        name: 'White Sneakers',
        description: 'Trendy white sneakers for casual outfits',
        price: 1500000, // ₦15,000
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
        category: 'ACCESSORIES',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Leather Crossbody Bag',
        description: 'Compact leather bag perfect for daily essentials',
        price: 1200000, // ₦12,000
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
        category: 'ACCESSORIES',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Designer Sunglasses',
        description: 'Stylish sunglasses with UV protection',
        price: 450000, // ₦4,500
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
        category: 'ACCESSORIES',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Canvas Backpack',
        description: 'Durable canvas backpack for everyday use',
        price: 680000, // ₦6,800
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
        category: 'ACCESSORIES',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Leather Belt - Brown',
        description: 'Classic leather belt with silver buckle',
        price: 350000, // ₦3,500
        imageUrl: 'https://images.unsplash.com/photo-1624222247344-550fb60583f2',
        category: 'ACCESSORIES',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Baseball Cap',
        description: 'Adjustable baseball cap for casual style',
        price: 280000, // ₦2,800
        imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b',
        category: 'ACCESSORIES',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wrist Watch - Silver',
        description: 'Elegant silver watch with leather strap',
        price: 2200000, // ₦22,000
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        category: 'ACCESSORIES',
      },
    }),
  ]);

  console.log('✅ Created products');

  // Create Cart for regular user
  const cart = await prisma.cart.create({
    data: {
      userId: regularUser.id,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 2,
          },
          {
            productId: products[2].id,
            quantity: 1,
          },
        ],
      },
    },
  });

  console.log('✅ Created cart with items');

  // Create an Order
  const order = await prisma.order.create({
    data: {
      userId: regularUser.id,
      totalAmount: 2100000, // ₦21,000 in kobo
      paymentReference: 'ref_test_123456',
      paymentStatus: 'PAID',
      orderItems: {
        create: [
          {
            productId: products[1].id,
            quantity: 1,
            price: products[1].price,
          },
          {
            productId: products[3].id,
            quantity: 1,
            price: products[3].price,
          },
        ],
      },
    },
  });

  console.log('✅ Created order with items');

  console.log('🎉 Seeding finished!');
  console.log('\n📊 Summary:');
  console.log(`- Created ${await prisma.user.count()} users`);
  console.log(`- Created ${await prisma.product.count()} products`);
  console.log(`- Created ${await prisma.cart.count()} cart(s)`);
  console.log(`- Created ${await prisma.order.count()} order(s)`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });