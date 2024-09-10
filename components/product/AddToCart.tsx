'use client';

import type { CartProduct, Product, Size } from '@/src/types/product.type';
import { useState } from 'react';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';
import { useCartStore } from '@/src/store/cart-store';

interface AddToCartProps {
  product: Product;
}

const AddToCart = ({ product }: AddToCartProps) => {


  const {addProductToCart}=useCartStore()
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!selectedSize) return;

    const productToAdd: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      image: product.images[0],
    };
    
    addProductToCart(productToAdd);
    setPosted(false);
    setSelectedSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {posted && !selectedSize && (
        <span className='mt-2 text-red-500 fade-in'>
          Debe seleccionar talla antes de agregar al carrito.
        </span>
      )}

      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={selectedSize}
        availableSizes={product.sizes}
        onSelectedSize={size => setSelectedSize(size)}
      />

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={value => setQuantity(value)}
      />

      {/* Botón agregar al carrito */}
      <button onClick={() => addToCart()} className='btn-primary my-5'>
        Agregar al carrito
      </button>
    </>
  );
};

export default AddToCart;
