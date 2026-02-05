'use client';

import Link from 'next/link';
import { popupStores } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function PopupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const popup = popupStores.find((p) => p.id === Number(id));

  if (!popup) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-10 border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link href="/popup" className="text-2xl">←</Link>
          <h1 className="flex-1 text-center text-lg font-display font-bold">팝업스토어</h1>
          <div className="w-8"></div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto">
        {/* 팝업 이미지 */}
        <div
          className="aspect-video"
          style={{ backgroundColor: popup.bgColor }}
        ></div>

        {/* 팝업 정보 */}
        <div className="px-4 py-6">
          <h2 className="text-2xl font-display font-bold mb-2">{popup.title}</h2>
          <p className="text-gray-600 mb-6">{popup.date}</p>

          <div className="mb-8 pb-8 border-b">
            <h3 className="font-bold mb-3">위치</h3>
            <p className="text-sm mb-2">서울시 마포구 홍익로 123</p>
            <p className="text-sm text-gray-600">홍대입구역 9번 출구 도보 5분</p>
          </div>

          <div className="mb-8 pb-8 border-b">
            <h3 className="font-bold mb-3">운영 시간</h3>
            <p className="text-sm">평일 11:00 - 20:00</p>
            <p className="text-sm">주말 11:00 - 21:00</p>
            <p className="text-sm text-gray-600 mt-2">* 매주 월요일 휴무</p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-3">소개</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              비버하우스의 특별한 팝업스토어에서 다양한 굿즈와 한정판 상품을 만나보세요. 
              포토존과 특별 이벤트도 준비되어 있습니다.
            </p>
          </div>

          <div className="mb-20">
            <h3 className="font-bold mb-3">안내사항</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 현장 결제 가능 (카드/현금)</li>
              <li>• 포장 서비스 무료 제공</li>
              <li>• 주차 불가 (대중교통 이용 권장)</li>
            </ul>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="max-w-3xl mx-auto">
            <button className="w-full py-4 bg-black text-white rounded-lg font-bold">
              지도 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}