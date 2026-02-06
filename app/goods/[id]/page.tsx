// app/goods/[id]/page.tsx (서버 컴포넌트 유지)
import { getProduct } from '@/lib/notion';
import { notFound } from 'next/navigation';
import ProductDetail from './ProductDetail';

export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}