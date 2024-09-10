'use client';

import { getStockBySlug } from '@/src/actions/product/get-stock-by-slug';
import { titleFont } from '@/src/config/fonts';
import { useEffect, useState } from 'react';

interface StockLabelProps {
  slug: string;
}

const StockLabel = ({ slug }: StockLabelProps) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
  };

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-md  `}
        >
          Stock: {stock}
        </h1>
      ) : (
        <h1
          className={`${titleFont.className} antialiased font-bold text-md bg-gray-200 animate-pulse `}
        >
          &nbsp;
        </h1>
      )}
    </>
  );
};

export default StockLabel;
