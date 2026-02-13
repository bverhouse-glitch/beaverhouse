'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

const notices: Notice[] = [
  {
    id: 5,
    title: '2026년 설 연휴 배송 안내',
    date: '2026-01-22',
    content: `안녕하세요, 비버하우스입니다.

설 연휴 기간 배송 일정을 안내드립니다.

휴무 기간
- 2025년 2월 14일(토) ~ 2월 18일(수)

주문 및 배송 안내
- 2월 13일(금) 오후 2시 이후 주문 건은 2월 19일(목)부터 순차 발송됩니다.
- 연휴 기간 중에는 고객센터 응대가 어려우니 양해 부탁드립니다.

즐거운 명절 보내시기 바랍니다.
감사합니다.`
  },
  {
    id: 4,
    title: '신규 상품 출시 예정 안내',
    date: '2026-01-18',
    content: `안녕하세요, 비버하우스입니다.

2월 중 새로운 상품 라인이 출시될 예정입니다!

출시 예정 상품
- 비버 인형 (S/M/L 사이즈)
- 후드 티셔츠 (2종)
- 에코백
- 아크릴 스탠드
- 포스터 세트

출시 일정
- 2025년 2월 중순 예정
- 사전 알림 신청 가능 (SHOP 페이지에서 확인)

많은 기대 부탁드립니다!`
  },
  {
    id: 2,
    title: '배송 및 제작 안내',
    date: '2026-01-10',
    content: `안녕하세요, 비버하우스입니다.

보다 나은 품질의 상품을 제공하기 위해 모든 상품은 주문 후 제작 방식으로 운영됩니다.

제작 및 배송 일정
- 주문 접수 후 제작 시작: 영업일 기준 1~2일
- 제작 기간: 영업일 기준 7~14일
- 배송 기간: 제작 완료 후 3~7일
- 총 소요 기간: 약 2~3주

주문 제작의 장점
✅ 불필요한 재고 없이 환경을 생각합니다
✅ 주문 시점의 신선한 상품을 받으실 수 있습니다
✅ 품질 관리에 더욱 신경 쓸 수 있습니다

조금 기다리셔야 하는 불편함이 있지만, 더 좋은 품질의 상품을 위한 선택임을 양해 부탁드립니다.

배송 진행 상황은 마이페이지에서 확인하실 수 있으며, 출고 시 개별 안내 문자를 발송해 드립니다.

감사합니다.`
  },
  {
    id: 1,
    title: '🎉 비버하우스 공식 스토어 오픈!',
    date: '2026-01-10',
    content: `안녕하세요, 비버하우스 공식 굿즈 스토어입니다.

드디어 비버하우스의 공식 온라인 스토어가 오픈했습니다!
팬 여러분께 사랑받는 캐릭터들을 더 가까이에서 만나실 수 있도록 정성껏 준비한 첫 번째 컬렉션을 선보입니다.

현재 판매 중인 상품
- 프리미엄 노트
- 그립톡
- 아크릴 키링
- 세라믹 머그컵
- 쿠션 커버

오픈 기념 이벤트
- 기간: 2026년 1월 10일 ~ 1월 31일
- 혜택: 전 상품 10% 할인 (쿠폰코드: WELCOME2025)
- 첫 구매 고객님께 스티커 증정

앞으로도 더 다양하고 특별한 굿즈로 찾아뵙겠습니다.
많은 관심과 사랑 부탁드립니다!

감사합니다.`
  },
];

export default function NoticePage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleNotice = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'new':
        return 'bg-blue-500';
      case 'important':
        return 'bg-red-500';
      case 'event':
        return 'bg-purple-500';
      default:
        return '';
    }
  };

  const getBadgeText = (badge?: string) => {
    switch (badge) {
      case 'new':
        return 'NEW';
      case 'important':
        return '중요';
      case 'event':
        return '이벤트';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">공지사항</h1>

        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="border rounded-lg overflow-hidden transition-all"
            >
              {/* 헤더 (클릭 가능) */}
              <button
                onClick={() => toggleNotice(notice.id)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1">
                  {/* 제목 + 뱃지 */}
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base font-semibold">
                      {notice.title}
                    </h2>
                  </div>

                  {/* 날짜 */}
                  <p className="text-sm text-gray-500">{notice.date}</p>
                </div>

                {/* 아이콘 */}
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition-transform ${
                    openId === notice.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* 내용 (펼쳐질 때만) */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === notice.id ? 'max-h-[2000px]' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 pt-2 border-t bg-gray-50">
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {notice.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 빈 상태 */}
        {notices.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>등록된 공지사항이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}