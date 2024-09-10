export const revalidate = 60;

import ProductGrid from '@/components/products/ProductGrid';
import Pagination from '@/components/ui/pagination/Pagination';
import Title from '@/components/ui/title/Title';
import { getPaginatedProductsWithImages } from '@/src/actions/product/product-pagination';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, currentPage } =
    await getPaginatedProductsWithImages({ page });

  console.log({ totalPages, currentPage });
  if (products.length === 0) redirect('/');

  return (
    <>
      <Title title='Shop' subtitle='All products' className='mb-2' />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
