import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import * as schema from '../src/db/schema.js';
import { explainDbConnectionError, openScriptDb } from './open-db.js';

const { users, categories, products, exchangeRates } = schema;

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@core-bolt.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMeAdmin123!';
  const markup = process.env.DEFAULT_FX_MARKUP_PERCENT ?? '2.5';

  const { db, close } = await openScriptDb();
  console.log('Seeding COREBOLT…');

  try {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    const existingAdmin = await db.query.users.findFirst({
      where: eq(users.email, adminEmail.toLowerCase()),
    });

    if (!existingAdmin) {
      await db.insert(users).values({
        email: adminEmail.toLowerCase(),
        passwordHash,
        name: 'COREBOLT Admin',
        role: 'admin',
        emailVerifiedAt: new Date(),
      });
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log(`Admin user already exists: ${adminEmail}`);
    }

    const existingFx = await db.query.exchangeRates.findFirst();
    if (!existingFx) {
      await db.insert(exchangeRates).values({
        baseCurrency: 'INR',
        quoteCurrency: 'USD',
        rate: '83.50000000',
        markupPercent: markup,
        source: 'seed',
        fetchedAt: new Date(),
      });
      console.log('Seed FX rate: 83.50 INR/USD, markup', markup);
    }

    let lidar = await db.query.categories.findFirst({
      where: eq(categories.slug, 'lidar'),
    });
    if (!lidar) {
      const [created] = await db
        .insert(categories)
        .values({
          name: 'LiDAR',
          slug: 'lidar',
          description: 'LiDAR sensors and perception kits',
          sortOrder: 1,
        })
        .returning();
      lidar = created;
    }

    let compute = await db.query.categories.findFirst({
      where: eq(categories.slug, 'edge-compute'),
    });
    if (!compute) {
      const [created] = await db
        .insert(categories)
        .values({
          name: 'Edge Compute',
          slug: 'edge-compute',
          description: 'AI edge computers and developer kits',
          sortOrder: 2,
        })
        .returning();
      compute = created;
    }

    const sampleProducts = [
      {
        name: 'RoboSense Airy 96-Beam LiDAR',
        slug: 'robosense-airy-96-beam-lidar',
        sku: 'RS-AIRY-96',
        categoryId: lidar!.id,
        pricingType: 'FIXED' as const,
        priceInr: '249999.00',
        shippingInr: '2500.00',
        shippingUsd: '45',
        shortDescription: 'Compact 96-beam LiDAR for robotics perception.',
        description: 'Sample FIXED-price product for COREBOLT catalogue seed.',
        imageUrl: 'https://assets.core-bolt.com/placeholder-lidar.jpg',
      },
      {
        name: 'NVIDIA Jetson Orin Developer Kit',
        slug: 'nvidia-jetson-orin-developer-kit',
        sku: 'NV-ORIN-DEV',
        categoryId: compute!.id,
        pricingType: 'FIXED' as const,
        priceInr: '189999.00',
        shippingInr: '1500.00',
        shippingUsd: '35',
        shortDescription: 'Edge AI developer kit for vision and LiDAR workloads.',
        description: 'Sample FIXED-price edge compute product.',
        imageUrl: 'https://assets.core-bolt.com/placeholder-orin.jpg',
      },
      {
        name: 'Custom Servo Lift Column',
        slug: 'custom-servo-lift-column',
        sku: 'CB-LIFT-CUSTOM',
        categoryId: compute!.id,
        pricingType: 'ON_REQUEST' as const,
        priceInr: null,
        shippingInr: '0',
        shippingUsd: '0',
        shortDescription: 'Engineered lift column — request a quote.',
        description: 'Sample ON_REQUEST product; not cartable.',
        imageUrl: 'https://assets.core-bolt.com/placeholder-lift.jpg',
      },
    ];

    for (const p of sampleProducts) {
      const existing = await db.query.products.findFirst({
        where: eq(products.slug, p.slug),
      });
      if (existing) {
        console.log(`Product exists: ${p.slug}`);
        continue;
      }
      await db.insert(products).values(p);
      console.log(`Product created: ${p.slug}`);
    }

    console.log('Seed complete. Run db:seed:catalog for the full catalogue.');
  } finally {
    await close();
  }
}

main().catch((err) => {
  console.error(explainDbConnectionError(err));
  process.exit(1);
});
