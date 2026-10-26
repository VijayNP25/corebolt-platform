/**
 * Publish the website catalogue into the database.
 * Run after migrate: `pnpm --filter api db:seed:catalog`
 *
 * The snapshot is what the site renders. Product rows are the same items for checkout.
 */
import { websiteCatalog as sourceCategories } from '../../web/src/data/products.ts';
import type { Db } from '../src/db/client.js';
import {
  publishStorefrontCatalog,
  type SourceCategory,
} from '../src/services/catalog-publish.js';
import { explainDbConnectionError, openScriptDb } from './open-db.js';

async function main() {
  const { db, close } = await openScriptDb();
  console.log('Publishing website catalogue into the database…');

  try {
    const result = await publishStorefrontCatalog(
      db as Db,
      sourceCategories as unknown as SourceCategory[],
    );
    console.log(
      `Catalogue published. created=${result.created} updated=${result.updated} totalSource=${result.totalSource}`,
    );
  } finally {
    await close();
  }
}

main().catch((err) => {
  console.error(explainDbConnectionError(err));
  process.exit(1);
});
