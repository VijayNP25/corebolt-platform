import { Router } from 'express';
import { cartItemSchema, currencySchema, updateCartItemSchema } from '@corebolt/shared';
import { z } from 'zod';
import { asyncHandler } from '../lib/asyncHandler.js';
import { routeParam } from '../lib/params.js';
import { optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as cartService from '../services/cart.service.js';

const router = Router();

router.use(optionalAuth);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const cart = await cartService.getOrCreateCart({
      userId: req.user?.sub,
      guestToken: req.guestToken,
      res,
    });
    const data = await cartService.serializeCart(cart.id);
    res.json({ data: { cart: data } });
  }),
);

router.patch(
  '/currency',
  validate(z.object({ currency: currencySchema })),
  asyncHandler(async (req, res) => {
    const cart = await cartService.getOrCreateCart({
      userId: req.user?.sub,
      guestToken: req.guestToken,
      res,
    });
    await cartService.setCartCurrency(cart.id, req.body.currency);
    const data = await cartService.serializeCart(cart.id);
    res.json({ data: { cart: data } });
  }),
);

router.post(
  '/items',
  validate(cartItemSchema),
  asyncHandler(async (req, res) => {
    const cart = await cartService.getOrCreateCart({
      userId: req.user?.sub,
      guestToken: req.guestToken,
      res,
    });
    await cartService.addCartItem(cart.id, req.body.productId, req.body.quantity);
    const data = await cartService.serializeCart(cart.id);
    res.status(201).json({ data: { cart: data } });
  }),
);

router.patch(
  '/items/:itemId',
  validate(updateCartItemSchema),
  asyncHandler(async (req, res) => {
    await cartService.updateCartItemQuantity(
      routeParam(req.params.itemId, 'itemId'),
      req.body.quantity,
    );
    const cart = await cartService.getOrCreateCart({
      userId: req.user?.sub,
      guestToken: req.guestToken,
      res,
    });
    const data = await cartService.serializeCart(cart.id);
    res.json({ data: { cart: data } });
  }),
);

router.delete(
  '/items/:itemId',
  asyncHandler(async (req, res) => {
    await cartService.removeCartItem(routeParam(req.params.itemId, 'itemId'));
    const cart = await cartService.getOrCreateCart({
      userId: req.user?.sub,
      guestToken: req.guestToken,
      res,
    });
    const data = await cartService.serializeCart(cart.id);
    res.json({ data: { cart: data } });
  }),
);

export default router;
