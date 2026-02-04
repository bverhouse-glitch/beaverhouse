'use client';

import { useState } from 'react';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // 메인 배너
  const mainBanners = [
    { id: 1, title: '비버 신상품 출시', bgColor: '#FFE5B4' },
    { id: 2, title: '팝업스토어 오픈', bgColor: '#E5F3FF' },
    { id: 3, title: '특가 이벤트 진행중', bgColor: '#FFE5E5' },
  ];

  // 진행중 팝업
  const popupStores = [
    { id: 1, title: '홍대 팝업스토어', date: '2026.02.01 - 02.28', bgColor: '#F5F5F5' },
    { id: 2, title: '강남 팝업스토어', date: '2026.03.01 - 03.31', bgColor: '#F0F0F0' },
  ];

  // 전체 굿즈 목록
  const allProducts = [
    { id: 1, name: '비버 미니 피규어', price: '29,000', category: '피규어', bgColor: '#FFF8E1' },
    { id: 2, name: '비버 에코백', price: '15,000', category: '패션', bgColor: '#E8F5E9' },
    { id: 3, name: '비버 노트', price: '8,000', category: '문구', bgColor: '#E3F2FD' },
    { id: 4, name: '비버 키링', price: '12,000', category: '악세서리', bgColor: '#FCE4EC' },
    { id: 5, name: '비버 스티커팩', price: '6,000', category: '문구', bgColor: '#FFF3E0' },
    { id: 6, name: '비버 후드티', price: '45,000', category: '패션', bgColor: '#F3E5F5' },
    { id: 7, name: '비버 머그컵', price: '18,000', category: '리빙', bgColor: '#E1F5FE' },
    { id: 8, name: '비버 파우치', price: '22,000', category: '패션', bgColor: '#FFF9C4' },
    { id: 9, name: '비버 인형 대형', price: '89,000', category: '피규어', bgColor: '#F1F8E9' },
    { id: 10, name: '비버 볼펜 세트', price: '12,000', category: '문구', bgColor: '#FCE4EC' },
    { id: 11, name: '비버 마스킹테이프', price: '5,000', category: '문구', bgColor: '#E0F2F1' },
    { id: 12, name: '비버 맨투맨', price: '42,000', category: '패션', bgColor: '#FFF8E1' },
  ];

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <>
          {/* 메인 배너 */}
          <section>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
            >
              {mainBanners.map((banner) => (
                <SwiperSlide key={banner.id}>
                  <div
                    className="h-80 flex items-center justify-center"
                    style={{ backgroundColor: banner.bgColor }}
                  >
                    <p className="text-2xl font-bold">{banner.title}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 무한 스크롤 텍스트 */}
          <section className="bg-white text-black py-2 mb-6 overflow-hidden whitespace-nowrap border-y border-gray-200">
            <div className="inline-block animate-marquee">
              <span className="text-xs font-medium mx-4">NEW ARRIVALS</span>
              {/* 로고 이미지로 교체 예정: <img src="/logo-small.svg" className="inline h-3 mx-4" /> */}
              <span className="text-xs mx-4">LOGO</span>
              <span className="text-xs font-medium mx-4">POPUP STORE OPEN</span>
              <span className="text-xs mx-4">LOGO</span>
              <span className="text-xs font-medium mx-4">FREE SHIPPING OVER 50,000₩</span>
              <span className="text-xs mx-4">LOGO</span>
              <span className="text-xs font-medium mx-4">BEAVER HOUSE OFFICIAL</span>
              <span className="text-xs mx-4">LOGO</span>
              <span className="text-xs font-medium mx-4">NEW ARRIVALS</span>
              <span className="text-xs mx-4">LOGO</span>
              <span className="text-xs font-medium mx-4">POPUP STORE OPEN</span>
              <span className="text-xs mx-4">LOGO</span>
              <span className="text-xs font-medium mx-4">FREE SHIPPING OVER 50,000₩</span>
              <span className="text-xs mx-4">LOGO</span>
              <span className="text-xs font-medium mx-4">BEAVER HOUSE OFFICIAL</span>
              <span className="text-xs mx-4">LOGO</span>
            </div>
          </section>

          {/* 진행중 팝업 */}
          <section className="mb-8">
            <div className="px-4 mb-3">
              <h2 className="text-lg font-bold">진행중 팝업</h2>
            </div>
            <Swiper spaceBetween={12} slidesPerView={1.2} style={{ paddingLeft: '16px' }}>
              {popupStores.map((popup) => (
                <SwiperSlide key={popup.id}>
                  <div
                    className="h-32 rounded p-4 flex flex-col justify-between"
                    style={{ backgroundColor: popup.bgColor }}
                  >
                    <h3 className="font-bold">{popup.title}</h3>
                    <p className="text-sm text-gray-600">{popup.date}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 신상품 섹션 */}
          <section className="mb-8">
            <div className="px-4 mb-3">
              <h2 className="text-lg font-bold">신상품</h2>
            </div>
            <Swiper spaceBetween={12} slidesPerView={2.3} style={{ paddingLeft: '16px' }}>
              {allProducts.slice(0, 8).map((product) => (
                <SwiperSlide key={product.id}>
                  <div>
                    <div
                      className="aspect-square mb-2"
                      style={{ backgroundColor: product.bgColor }}
                    ></div>
                    <p className="text-sm font-medium mb-1">{product.name}</p>
                    <p className="text-sm font-bold">{product.price}원</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 비버 소개 섹션 */}
          <section className="px-4 mb-8">
            <div className='border-y border-gray-200 mb-8'></div>
            <div className="mb-22 fade-in">
              <h2 className="text-2xl font-bold mb-6">BEAVER HOUSE</h2>
              <p className="text-sm leading-relaxed mb-4">
                비버하우스(Beaver House)는 쉼 없이 오늘을 살아가는 비버들의 이야기에서 출발했습니다.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                성실함이 미덕이 된 세상 속에서, 우리는 늘 다음을 향해 달려왔습니다.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                하지만 비버하우스는 묻습니다. 열심히 사는 것만이 전부일까? 우리는 잠시 숨을 고르고, 몸과 마음을 달랠 수 있는 하우스의 필요성에 주목합니다.
              </p>
              <p className="text-sm leading-relaxed">
                지친 일상 한가운데서 미소를 건네는 콘텐츠. 아무것도 하지 않아도 괜찮다고 말하는 이야기. 비버하우스는 치열한 댐 너머, 당신만의 안식처가 되겠습니다.
              </p>
            </div>

            <div className="mb-12 fade-in-delay-1">
              <div className="bg-gray-100 aspect-video mb-4 flex items-center justify-center">
                {/* 로고 이미지로 교체: <img src="/logo-large.png" alt="Beaver House Logo" className="max-h-full" /> */}
                <p className="text-gray-400">LOGO IMAGE</p>
              </div>
              <h3 className="text-lg font-bold mb-3">우리의 로고</h3>
              <p className="text-sm leading-relaxed mb-4">
                우리의 로고는 '비버의 집'에서 시작되었습니다. 비버의 집은 나뭇가지가 켜켜이 쌓여, 멀리서 보면 우리가 떠올리는 '집'의 모습과 닮아 있습니다.
              </p>
              <p className="text-sm leading-relaxed">
                그렇게 생각하고 보니 쉬지 않고 댐을 짓는 비버도 정신없이 하루를 살아가는 우리와 비슷하다 생각했습니다. 지붕 밑 비버처럼 지붕 밑 우리들. 사람의 공간이자 비버의 공간, 일하는 존재의 집이자 쉬는 존재의 집이라는 의미를 담고 있습니다.
              </p>
            </div>

            <div className="mb-12 fade-in-delay-2">
              <div className="bg-gray-100 aspect-video mb-4 flex items-center justify-center">
                {/* 캐릭터 이미지로 교체: <img src="/beaver-character.png" alt="Beaver Character" className="max-h-full" /> */}
                <p className="text-gray-400">BEAVER CHARACTER IMAGE</p>
              </div>
              <h3 className="text-lg font-bold mb-3">비버 캐릭터</h3>
              <p className="text-sm leading-relaxed">
                비버는 댐을 짓는 동물입니다. 살아갈 보금자리를 만들기 위해 끊임없이 나무를 모아 쌓습니다. 쉬지 않고 움직이며 집을 만들어내는 모습은 오늘을 치열하게 살아가고, '나의 집'으로 돌아가는 우리와 닮아 있습니다.
              </p>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className='border-y border-gray-200 mb-8'></div>
            <div className="fade-in-delay-3">
              <h3 className="text-lg font-bold mb-4">진행중 이벤트</h3>
              <div className="space-y-4">
                <div>
                  <div className="bg-gray-100 aspect-video mb-2 flex items-center justify-center">
                    {/* 이벤트 이미지로 교체: <img src="/event1.jpg" /> */}
                    <p className="text-gray-400">EVENT IMAGE 1</p>
                  </div>
                  <h4 className="font-bold mb-1">신상품 런칭 기념 이벤트</h4>
                  <p className="text-sm text-gray-600">비버하우스 신상품 출시를 기념하여 특별한 혜택을 준비했습니다</p>
                </div>
                <div>
                  <div className="bg-gray-100 aspect-video mb-2 flex items-center justify-center">
                    {/* 이벤트 이미지로 교체: <img src="/event2.jpg" /> */}
                    <p className="text-gray-400">EVENT IMAGE 2</p>
                  </div>
                  <h4 className="font-bold mb-1">홍대 팝업스토어 오픈</h4>
                  <p className="text-sm text-gray-600">2월 한 달간 홍대에서 비버하우스를 만나보세요</p>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }

    if (activeTab === 'goods') {
      return (
        <section className="px-4 pt-4">
          <h2 className="text-xl font-bold mb-4">전체 굿즈</h2>
          <div className="grid grid-cols-2 gap-4">
            {allProducts.map((product) => (
              <div key={product.id}>
                <div
                  className="aspect-square mb-2"
                  style={{ backgroundColor: product.bgColor }}
                ></div>
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <p className="text-sm font-medium mb-1">{product.name}</p>
                <p className="text-sm font-bold">{product.price}원</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'popup') {
      return (
        <section className="px-4 pt-4">
          <h2 className="text-xl font-bold mb-4">팝업스토어</h2>
          {popupStores.map((popup) => (
            <div
              key={popup.id}
              className="mb-4 p-6 rounded"
              style={{ backgroundColor: popup.bgColor }}
            >
              <h3 className="text-lg font-bold mb-2">{popup.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{popup.date}</p>
              <p className="text-sm">서울시 마포구 홍익로 123</p>
            </div>
          ))}
        </section>
      );
    }

    if (activeTab === 'my') {
      return (
        <section className="px-4 pt-4">
          <h2 className="text-xl font-bold mb-6">마이페이지</h2>
          <div className="space-y-4">
            <button className="w-full text-left py-3 border-b">주문 내역</button>
            <button className="w-full text-left py-3 border-b">배송 조회</button>
            <button className="w-full text-left py-3 border-b">찜한 상품</button>
            <button className="w-full text-left py-3 border-b">고객센터</button>
          </div>
        </section>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white z-40 px-4 py-4 border-b flex items-center">
        <button onClick={() => setMenuOpen(true)} className="mr-4">
          <Menu size={24} />
        </button>
        {/* 로고 이미지로 교체 예정: <img src="/logo.svg" alt="Beaver House" className="h-6" /> */}
        <h1 className="text-xl font-bold">BEAVER HOUSE</h1>
      </header>

      {/* 풀스크린 메뉴 */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-all duration-500 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute top-8 right-8">
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X size={32} />
          </button>
        </div>
        
        <nav className="flex flex-col items-start justify-center h-full px-12">
          {[
            { text: 'HOME', delay: 0 },
            { text: 'SHOP', delay: 100 },
            { text: 'POPUP STORE', delay: 200 },
            { text: 'ABOUT BEAVER', delay: 300 },
            { text: 'NOTICE', delay: 400 },
            { text: 'CONTACT', delay: 500 },
          ].map((item, index) => (
            <button
              key={item.text}
              className={`text-white text-4xl font-bold mb-8 text-left transition-all duration-700 ${
                menuOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{
                transitionDelay: menuOpen ? `${item.delay}ms` : '0ms',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="pt-16 pb-20">{renderContent()}</main>

      {/* 푸터 */}
      <footer className="bg-black text-white px-4 py-10 text-sm">
        <div className="mb-6">
          <p className="font-bold text-lg mb-4">BEAVER HOUSE</p>
          <div className="text-gray-400 space-y-1">
            <p>대표: 홍길동</p>
            <p>사업자등록번호: 123-45-67890</p>
            <p>통신판매업신고: 2026-서울마포-0001</p>
            <p>주소: 서울시 마포구 비버로 123</p>
          </div>
        </div>
        
        <div className="mb-6 text-gray-400 space-y-1">
          <p>이메일: contact@beaverhouse.co.kr</p>
          <p>고객센터: 02-1234-5678</p>
          <p className="text-xs">평일 10:00-18:00 (주말 및 공휴일 휴무)</p>
        </div>

        <div className="flex gap-4 mb-6">
          {/* SNS 아이콘 이미지로 교체 예정: <img src="/instagram-icon.svg" className="w-6 h-6" /> */}
          <a href="#" className="text-gray-600">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-600">
            <Youtube size={20} />
          </a>
        </div>

        <div className="flex gap-4 mb-6 text-xs text-gray-400">
          <button>이용약관</button>
          <button className="font-bold text-white">개인정보처리방침</button>
        </div>

        <p className="text-xs text-gray-500">© 2026 BEAVER HOUSE. All rights reserved.</p>
      </footer>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="flex">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-3 text-center text-xs ${
              activeTab === 'home' ? 'text-black font-medium' : 'text-gray-400'
            }`}
          >
            홈
          </button>
          <button
            onClick={() => setActiveTab('goods')}
            className={`flex-1 py-3 text-center text-xs ${
              activeTab === 'goods' ? 'text-black font-medium' : 'text-gray-400'
            }`}
          >
            굿즈
          </button>
          <button
            onClick={() => setActiveTab('popup')}
            className={`flex-1 py-3 text-center text-xs ${
              activeTab === 'popup' ? 'text-black font-medium' : 'text-gray-400'
            }`}
          >
            팝업
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`flex-1 py-3 text-center text-xs ${
              activeTab === 'my' ? 'text-black font-medium' : 'text-gray-400'
            }`}
          >
            MY
          </button>
        </div>
      </nav>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(0, 0, 0, 0.3);
        }
        .swiper-pagination-bullet-active {
          background: black;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .fade-in-delay-1 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.2s forwards;
        }
        .fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.4s forwards;
        }
        .fade-in-delay-3 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.6s forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}