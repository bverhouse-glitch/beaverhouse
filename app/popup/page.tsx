'use client';

import Link from 'next/link';
import { useState } from 'react';
import { popupStores } from '@/lib/data';
import Image from 'next/image';

export default function PopupPage() {
  const [tab, setTab] = useState<'ongoing' | 'past'>('ongoing');

  const ongoingPopups = popupStores;
  const pastPopups = [
    { id: 3, title: '강남 팝업스토어', date: '2025.12.01 - 12.31', bgColor: '#F5F5F5', image: '' },
    { id: 4, title: '명동 팝업스토어', date: '2025.11.01 - 11.30', bgColor: '#F0F0F0', image: '' },
  ];

  const currentPopups = tab === 'ongoing' ? ongoingPopups : pastPopups;

  // 각 포스터마다 랜덤 회전값
  const rotations = [2, -1.5, 1, -2, 1.5, -1];

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

      {/* 팝업 목록 - 포스터 느낌 */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-16">
          {currentPopups.map((popup, index) => (
            <div 
              key={popup.id}
              className="group cursor-pointer grid grid-cols-2"
              style={{ 
                transform: `rotate(${rotations[index % rotations.length]}deg)`,
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${rotations[index % rotations.length]}deg)`;
              }}
            >
              {/* 포스터 이미지 */}
              <div 
                className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6"
                style={{ backgroundColor: popup.bgColor }}
              >
              </div>

              {/* 정보 */}
              <div className="text-center px-4">
                <h3 className="text-xl font-display font-bold mb-2">{popup.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{popup.date}</p>
                <p className="text-sm text-gray-500">서울시 마포구 홍익로 123</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}