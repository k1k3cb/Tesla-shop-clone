import type { Size } from '@/src/types/product.type';
import clsx from 'clsx';

interface SizeSelectorProps {
  selectedSize?: Size;
  availableSizes: Size[];
  onSelectedSize: (size: Size) => void;
}

const SizeSelector = ({ selectedSize, availableSizes,onSelectedSize }: SizeSelectorProps) => {
  return (
    <div className='my-5 '>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>
      <div className='flex gap-2'>
        {availableSizes.map(size => (
          <button
            key={size}
            onClick={() => onSelectedSize(size)}
            className={clsx(
              'w-12 h-12 rounded border flex justify-center items-center hover:underline' ,
              selectedSize === size ? 'bg-black text-white' : 'bg-gray-200'
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
