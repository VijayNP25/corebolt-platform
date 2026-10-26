import { Router } from 'express';
import { asyncHandler } from '../lib/asyncHandler.js';
import { getStorefrontCatalog } from '../services/catalog-publish.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const categories = await getStorefrontCatalog();
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json({ data: { categories } });
  }),
);

export default router;
