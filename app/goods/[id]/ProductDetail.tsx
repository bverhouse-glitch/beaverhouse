'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { addToCart } from '@/lib/firestore';
import Toast from '@/components/Toast';

export default function ProductDetail({ product }: { product: any }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = async () => {
    const user = auth.currentUser;
    
    if (!user) {
      router.push('/my/login');
      return;
    }

    if (product.stock === 0) return;

    setAdding(true);
    try {
      await addToCart(user.uid, product.id, 1);
      setShowToast(true);
    } catch (error) {
      alert('오류가 발생했습니다');
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      {showToast && (
        <Toast 
          message="장바구니에 담았습니다" 
          onClose={() => setShowToast(false)} 
        />
      )}
      
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 bg-white z-10 border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
            <Link href="/goods" className="text-xl">←</Link>
            <h1 className="flex-1 text-center text-base font-medium">상품</h1>
            <div className="w-6"></div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto">
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

          <div className="px-4 py-6">
            {product.category && (
              <div className="text-xs text-gray-400 mb-2">
                {product.category}
              </div>
            )}

            <h1 className="text-xl font-semibold text-gray-900 mb-3">
              {product.name}
            </h1>

            <div className="mb-6">
              <span className="text-2xl font-bold text-gray-900">
                {product.price.toLocaleString()}
              </span>
              <span className="text-lg text-gray-900">원</span>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

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

            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-900 mb-2">재고</h2>
              <div className="text-sm text-gray-600">
                {product.stock > 0 ? (
                  <span>{product.stock}개 남음</span>
                ) : (
                  <span className="text-red-500">품절</span>
                )}
              </div>
            </div>

            {product.createdAt && (
              <div className="text-xs text-gray-400 mb-8">
                {new Date(product.createdAt).toLocaleDateString('ko-KR')}
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <div className="max-w-3xl mx-auto">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || adding}
                className={`w-full py-4 rounded-lg text-base font-medium ${
                  product.stock > 0
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {adding ? '담는 중...' : product.stock > 0 ? '장바구니에 담기' : '품절'}
              </button>
            </div>
          </div>

          <div className="h-24"></div>
        </main>
      </div>
    </>
  );
}