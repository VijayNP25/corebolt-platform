import { Router } from 'express';
import authRoutes from './auth.routes.js';
import productsRoutes from './products.routes.js';
import categoriesRoutes from './categories.routes.js';
import cartRoutes from './cart.routes.js';
import checkoutRoutes from './checkout.routes.js';
import ordersRoutes from './orders.routes.js';
import enquiriesRoutes from './enquiries.routes.js';
import currencyRoutes from './currency.routes.js';
import reviewsRoutes from './reviews.routes.js';
import addressesRoutes from './addresses.routes.js';
import healthRoutes from './health.routes.js';
import customersRoutes from './customers.routes.js';
import reportsRoutes from './reports.routes.js';
import auditRoutes from './audit.routes.js';
import catalogRoutes from './catalog.routes.js';

const v1 = Router();

v1.use('/health', healthRoutes);
v1.use('/catalog', catalogRoutes);
v1.use('/auth', authRoutes);
v1.use('/products', productsRoutes);
v1.use('/categories', categoriesRoutes);
v1.use('/cart', cartRoutes);
v1.use('/checkout', checkoutRoutes);
v1.use('/orders', ordersRoutes);
v1.use('/enquiries', enquiriesRoutes);
v1.use('/currency', currencyRoutes);
v1.use('/reviews', reviewsRoutes);
v1.use('/addresses', addressesRoutes);
v1.use('/customers', customersRoutes);
v1.use('/reports', reportsRoutes);
v1.use('/audit', auditRoutes);

export default v1;
