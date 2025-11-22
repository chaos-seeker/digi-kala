import { Breadcrumb } from '@/components/breadcrumb';
import { Attributes } from '@/containers/routes/single-product/attributes';
import { Colors } from '@/containers/routes/single-product/colors';
import { Images } from '@/containers/routes/single-product/images';
import { PriceWithButton } from '@/containers/routes/single-product/price-with-button';
import { Title } from '@/containers/routes/single-product/title';
import { appRouter } from '@/server/_app';
import { createContext } from '@/server/context';
import { TProduct } from '@/types/product';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;
  const caller = appRouter.createCaller(await createContext());
  const product = (await caller.product.getBySlug({ slug })) as TProduct | null;

  if (!product) {
    notFound();
  }

  return (
    <div className="container">
      <Breadcrumb product={product} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <Images product={product} />
        <div className="flex-1 min-w-0">
          <Title product={product} />
          <Colors product={product} />
          <Attributes product={product} />
        </div>
        <PriceWithButton product={product} />
      </div>
    </div>
  );
}
