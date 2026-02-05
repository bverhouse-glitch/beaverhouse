import { getProduct, getAllProducts } from '@/lib/notion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link href="/goods" className="text-xl">←</Link>
          <h1 className="flex-1 text-center text-base font-medium">상품</h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-3xl mx-auto">
        {/* 상품 이미지 */}
        <div
          className="relative aspect-square w-full"
          style={{ backgroundColor: product.bgColor }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-300 text-8xl">📦</span>
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="px-4 py-6">
          {/* 카테고리 */}
          {product.category && (
            <div className="text-xs text-gray-400 mb-2">
              {product.category}
            </div>
          )}

          {/* 상품명 */}
          <h1 className="text-xl font-semibold text-gray-900 mb-3">
            {product.name}
          </h1>

          {/* 가격 */}
          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-900">
              {product.price.toLocaleString()}
            </span>
            <span className="text-lg text-gray-900">원</span>
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-100 my-6"></div>

          {/* 상품 설명 */}
          {product.description && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-900 mb-2">
                상품 설명
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}

          {/* 재고 정보 */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-900 mb-2">
              재고
            </h2>
            <div className="text-sm text-gray-600">
              {product.stock > 0 ? (
                <span>{product.stock}개 남음</span>
              ) : (
                <span className="text-red-500">품절</span>
              )}
            </div>
          </div>

          {/* 등록일 */}
          {product.createdAt && (
            <div className="text-xs text-gray-400 mb-8">
              {new Date(product.createdAt).toLocaleDateString('ko-KR')}
            </div>
          )}
        </div>

        {/* 구매 버튼 - 하단 고정 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="max-w-3xl mx-auto">
            <button
              className={`w-full py-4 rounded-lg text-base font-medium ${
                product.stock > 0
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? '구매하기' : '품절'}
            </button>
          </div>
        </div>

        {/* 하단 여백 (버튼 공간 확보) */}
        <div className="h-24"></div>
      </main>
    </div>
  );
}