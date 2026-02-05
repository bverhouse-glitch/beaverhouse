'use client';

import Link from 'next/link';
import { useState } from 'react';
import { popupStores } from '@/lib/data';

export default function PopupPage() {
  const [tab, setTab] = useState<'ongoing' | 'past'>('ongoing');

  // 실제로는 데이터에 status 필드가 있어야 하지만, 임시로 분리
  const ongoingPopups = popupStores;
  const pastPopups = [
    { id: 3, title: '강남 팝업스토어', date: '2025.12.01 - 12.31', bgColor: '#F5F5F5' },
    { id: 4, title: '명동 팝업스토어', date: '2025.11.01 - 11.30', bgColor: '#F0F0F0' },
  ];

  const currentPopups = tab === 'ongoing' ? ongoingPopups : pastPopups;

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-10 border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-2xl">←</Link>
          <h1 className="flex-1 text-center text-lg font-display font-bold">팝업스토어</h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* 탭 */}
      <div className="sticky top-14 bg-white z-10 border-b">
        <div className="max-w-3xl mx-auto flex">
          <button
            onClick={() => setTab('ongoing')}
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
              tab === 'ongoing'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400'
            }`}
          >
            진행중
          </button>
          <button
            onClick={() => setTab('past')}
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
              tab === 'past'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400'
            }`}
          >
            종료
          </button>
        </div>
      </div>

      {/* 팝업 목록 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {currentPopups.map((popup) => (
            <Link
              key={popup.id}
              href={`/popup/${popup.id}`}
              className="block p-6 rounded-lg border"
              style={{ backgroundColor: popup.bgColor }}
            >
              <h3 className="text-lg font-display font-bold mb-2">{popup.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{popup.date}</p>
              <p className="text-sm text-gray-500">서울시 마포구 홍익로 123</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}