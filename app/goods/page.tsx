import { getAllProducts } from '@/lib/notion';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function GoodsPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-xl">←</Link>
          <h1 className="flex-1 text-center text-base font-medium">상점</h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-gray-400 text-sm">등록된 상품이 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/goods/${product.id}`}
                className="block"
              >
                <div>
                  {/* 상품 이미지 */}
                  <div
                    className="relative aspect-square rounded-lg overflow-hidden mb-3"
                    style={{ backgroundColor: product.bgColor }}
                  >
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl opacity-20">📦</span>
                      </div>
                    )}
                    
                    {/* 품절 뱃지 */}
                    {product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        품절
                      </div>
                    )}
                  </div>

                  {/* 상품 정보 */}
                  <div>
                    {/* 카테고리 */}
                    {product.category && (
                      <div className="text-xs text-gray-400 mb-1">
                        {product.category}
                      </div>
                    )}
                    
                    {/* 상품명 */}
                    <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    
                    {/* 가격 */}
                    <div className="font-semibold text-gray-900">
                      {product.price.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}