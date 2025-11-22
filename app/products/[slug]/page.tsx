import { Breadcrumb } from '@/components/breadcrumb';
import { Attributes } from '@/containers/routes/single-product/attributes';
import { Colors } from '@/containers/routes/single-product/colors';
import { Description } from '@/containers/routes/single-product/description';
import { Images } from '@/containers/routes/single-product/images';
import { PriceWithButton } from '@/containers/routes/single-product/price-with-button';
import { SimilarProducts } from '@/containers/routes/single-product/similar-products';
import { Title } from '@/containers/routes/single-product/title';
import { ProductContent } from '@/containers/routes/single-product/product-content';
import { appRouter } from '@/server/_app';
import { createContext } from '@/server/context';
import { TProduct } from '@/types/product';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;
  const caller = appRouter.createCaller(await createContext());
  const [product, products] = await Promise.all([
    caller.product.getBySlug({ slug }),
    caller.product.getAll(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="container">
        <Breadcrumb product={product as TProduct} />
        <ProductContent product={product as TProduct} />
      </div>
      <Description product={product as TProduct} />
      <SimilarProducts products={products as TProduct[]} />
    </>
  );
}
