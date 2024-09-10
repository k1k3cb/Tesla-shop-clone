export const revalidate = 60;

import ProductGrid from '@/components/products/ProductGrid';
import Pagination from '@/components/ui/pagination/Pagination';
import Title from '@/components/ui/title/Title';
import { getPaginatedProductsWithImages } from '@/src/actions/product/product-pagination';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface CategoryPageProps {
  params: {
    gender: string;
  };

  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, currentPage } =
    await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  console.log({ totalPages, currentPage });
  if (products.length === 0) redirect(`/gender/${gender}`);

  const labels: Record<string, string> = {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'para todos'
  };

  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
        subtitle={`Todos los artículos ${labels[gender]}`}
        className='mb-2'
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
