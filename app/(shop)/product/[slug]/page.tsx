export const revalidate = 604800; //7 días

import AddToCart from '@/components/product/AddToCart';
import ProductMobileSlideShow from '@/components/product/slideshow/ProductMobileSlideShow';
import ProductSlideShow from '@/components/product/slideshow/ProductSlideShow';
import StockLabel from '@/components/product/stock-label/StockLabel';
import { getProductBySlug } from '@/src/actions/product/get-product-by-slug';
import { titleFont } from '@/src/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface SingleProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: SingleProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`]
    }
  };
}

export default async function SingleProductPage({
  params
}: SingleProductPageProps) {
  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/*Slideshow */}
      <div className='col-span-1 md:col-span-2 '>
        {/*Mobile Slideshow */}
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />

        {/*Desktop Slideshow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>

      {/*Detalles */}
      <div className='col-span-1 px-5'>
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl `}>
          {product.title}
        </h1>

        <p className='text-lg mb-5'>${product.price}</p>

        <AddToCart product={product} />
        {/* Descripción */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
