import { ProductForm } from '@/components/product/ProductForm';
import Title from '@/components/ui/title/Title';
import { getCategories } from '@/src/actions/category/get-categories';
import { getProductBySlug } from '@/src/actions/product/get-product-by-slug';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);

  // Todo: new
  if (!product && slug !== 'new') {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
