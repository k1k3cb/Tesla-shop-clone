'use client';

import { useCartStore } from '@/src/store/cart-store';
import { formatCurrency } from '@/src/utils/formatCurrency';
import { useEffect, useState } from 'react';

const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const { subTotal, tax, total, itemsInCart } = useCartStore(state=>state.getSummaryInformation());

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className='grid grid-cols-2'>
      <span>No. Productos</span>
      <span className='text-right'>{itemsInCart=== 1? '1 articulo': `${itemsInCart} artículos` }</span>

      <span>Subtotal</span>
      <span className='text-right'>{formatCurrency(subTotal)}</span>

      <span>Impuestos (21%)</span>
      <span className='text-right'>{formatCurrency(tax)}</span>

      <span className='mt-5 text-2xl'>Total:</span>
      <span className='mt-5 text-2xl text-right'>{formatCurrency(total)}</span>
    </div>
  );
};

export default OrderSummary;
