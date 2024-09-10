'use client';

import { useCartStore } from '@/src/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QuantitySelector from '../product/QuantitySelector';
import { formatCurrency } from '@/src/utils/formatCurrency';

const CheckProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore( state => state.cart );


  useEffect(() => {
    setLoaded(true) ;
  });

  
  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <>
       {productsInCart.map((product) => (
        <div key={ `${ product.slug }-${ product.size }`  } className="flex mb-5">
          <Image
            src={`/products/${product.image }`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <span>
              { product.size } - {product.title} ({ product.quantity })
            </span>
            
            <p className="font-bold">{ formatCurrency(product.price * product.quantity )  }</p>

          </div>
        </div>
      ))}
    </>
  );
};

export default CheckProductsInCart;
