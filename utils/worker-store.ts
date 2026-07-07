'use client';

import { OrderItem, MOCK_ORDERS } from '@/components/orders/constants';

const STORAGE_KEY = 'vance_worker_orders';

export function getLocalOrders(): OrderItem[] {
  if (typeof window === 'undefined') return MOCK_ORDERS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ORDERS));
    return MOCK_ORDERS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_ORDERS;
  }
}

export function saveLocalOrders(orders: OrderItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}
