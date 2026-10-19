'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  addLocalCartItem,
  clearLocalCart,
  readLocalCart,
  removeLocalCartItem,
  updateLocalCartQty,
  type LocalCart,
  type LocalCartItem,
} from '@/lib/local-cart';

export function useLocalCart() {
  const [cart, setCart] = useState<LocalCart>({ items: [], updatedAt: '' });

  const refresh = useCallback(() => {
    setCart(readLocalCart());
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'corebolt.localCart.v1') refresh();
    };
    const onCustom = () => refresh();
    window.addEventListener('storage', onStorage);
    window.addEventListener('corebolt:cart', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('corebolt:cart', onCustom);
    };
  }, [refresh]);

  return {
    cart,
    itemCount: cart.items.reduce((n, i) => n + i.quantity, 0),
    addItem: (item: Omit<LocalCartItem, 'quantity'> & { quantity?: number }) => {
      const next = addLocalCartItem(item);
      setCart(next);
      return next;
    },
    setQty: (productId: string, quantity: number) => {
      const next = updateLocalCartQty(productId, quantity);
      setCart(next);
      return next;
    },
    removeItem: (productId: string) => {
      const next = removeLocalCartItem(productId);
      setCart(next);
      return next;
    },
    clear: () => {
      const next = clearLocalCart();
      setCart(next);
      return next;
    },
    refresh,
  };
}
