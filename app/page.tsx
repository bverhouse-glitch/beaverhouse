'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Intersection Observer로 스크롤 애니메이션
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeTab]);

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
          <section className="overflow-hidden">
            <div className="max-w-3xl mx-auto">
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                centeredSlides
                loop
                speed={800}
                loopAdditionalSlides={mainBanners.length}
                watchSlidesProgress
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                breakpoints={{
                  768: {
                    slidesPerView: 1.0,
                    spaceBetween: 0,
                  },
                }}
                className="hero-swiper"
              >
                {mainBanners.map((banner) => (
                  <SwiperSlide key={banner.id}>
                    {({ isActive }) => (
                      <div className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden rounded-none transition-all duration-800">
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: banner.bgColor }}
                        ></div>
                        <div
                          className={`absolute inset-0 bg-black transition-opacity duration-800 ${
                            isActive ? 'opacity-0' : 'opacity-40'
                          }`}
                        ></div>
                        <p className={`relative text-2xl md:text-3xl font-display font-bold transition-all duration-800 ${
                          isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
                        }`}>
                          {banner.title}
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* 무한 스크롤 텍스트 */}
          <section className="bg-white text-black py-2 mb-6 md:mb-8 max-w-3xl mx-auto overflow-hidden whitespace-nowrap border-y border-gray-200">
            <div className="inline-block animate-marquee">
              <span className="text-xs md:text-sm font-medium mx-4">NEW ARRIVALS</span>
              <img src="/logo.png" alt="Beaver House" className="inline h-4 md:h-5 mx-4 align-middle" />
              <span className="text-xs md:text-sm font-medium mx-4">POPUP STORE OPEN</span>
              <img src="/logo.png" alt="Beaver House" className="inline h-4 md:h-5 mx-4 align-middle" />
              <span className="text-xs md:text-sm font-medium mx-4">FREE SHIPPING OVER 50,000₩</span>
              <img src="/logo.png" alt="Beaver House" className="inline h-4 md:h-5 mx-4 align-middle" />
              <span className="text-xs md:text-sm font-medium mx-4">BEAVER HOUSE OFFICIAL</span>
              <img src="/logo.png" alt="Beaver House" className="inline h-4 md:h-5 mx-4 align-middle" />
              <span className="text-xs md:text-sm font-medium mx-4">NEW ARRIVALS</span>
              <img src="/logo.png" alt="Beaver House" className="inline h-4 md:h-5 mx-4 align-middle" />
              <span className="text-xs md:text-sm font-medium mx-4">POPUP STORE OPEN</span>
              <img src="/logo.png" alt="Beaver House" className="inline h-4 md:h-5 mx-4 align-middle" />
              <span className="text-xs md:text-sm font-medium mx-4">FREE SHIPPING OVER 50,000₩</span>
              <img src="/logo.png" alt="Beaver House" className="inline h-4 md:h-5 mx-4 align-middle" />
              <span className="text-xs md:text-sm font-medium mx-4">BEAVER HOUSE OFFICIAL</span>
              <img src="/logo.png" alt="Beaver House" className="inline h-4 md:h-5 mx-4 align-middle" />
            </div>
          </section>

          {/* 진행중 팝업 */}
          <section
            id="popup-section"
            ref={(el) => { sectionRefs.current['popup-section'] = el; }}
            className={`mb-8 md:mb-12 transition-all duration-1000 ${
              visibleSections.has('popup-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="max-w-3xl mx-auto px-4 mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-display font-bold">진행중인 팝업</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Swiper 
                spaceBetween={12} 
                slidesPerView={1.2}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                  },
                }}
                style={{ paddingLeft: '16px' }}
              >
                {popupStores.map((popup) => (
                  <SwiperSlide key={popup.id}>
                    <div
                      className="h-32 md:h-36 rounded-lg p-4 md:p-5 flex flex-col justify-between transition-transform duration-300"
                      style={{ backgroundColor: popup.bgColor }}
                    >
                      <h3 className="font-display font-bold text-base md:text-lg">{popup.title}</h3>
                      <p className="text-sm md:text-base text-gray-600">{popup.date}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* 신상품 섹션 */}
          <section
            id="products-section"
            ref={(el) => { sectionRefs.current['products-section'] = el; }}
            className={`mb-8 md:mb-12 transition-all duration-1000 delay-200 ${
              visibleSections.has('products-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="max-w-3xl mx-auto px-4 mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-display font-bold">신상품</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Swiper 
                spaceBetween={12} 
                slidesPerView={2.3}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                  },
                }}
                style={{ paddingLeft: '16px' }}
              >
                {allProducts.slice(0, 8).map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="transition-transform duration-300 cursor-pointer">
                      <div
                        className="aspect-square mb-2 rounded-lg"
                        style={{ backgroundColor: product.bgColor }}
                      ></div>
                      <p className="text-sm md:text-base font-medium mb-1">{product.name}</p>
                      <p className="text-sm md:text-base font-bold">{product.price}원</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* 비버 소개 섹션 */}
          <section className="px-4 mb-8 md:mb-12 max-w-3xl mx-auto">
            <div className='border-y border-gray-200 mb-8 md:mb-10'></div>
            
            <div
              id="intro-section"
              ref={(el) => { sectionRefs.current['intro-section'] = el; }}
              className={`mb-12 md:mb-16 transition-all duration-1000 ${
                visibleSections.has('intro-section')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 md:mb-7">BEAVER HOUSE</h2>
              <div className="leading-relaxed space-y-4 md:space-y-5">
                <p className="text-sm md:text-base">
                  비버하우스(Beaver House)는 쉼 없이 오늘을 살아가는 비버들의 이야기에서 출발했습니다.
                </p>
                <p className="text-sm md:text-base">
                  성실함이 미덕이 된 세상 속에서, 우리는 늘 다음을 향해 달려왔습니다.
                </p>
                <p className="text-sm md:text-base">
                  하지만 비버하우스는 묻습니다. 열심히 사는 것만이 전부일까? 우리는 잠시 숨을 고르고, 몸과 마음을 달랠 수 있는 하우스의 필요성에 주목합니다.
                </p>
                <p className="text-sm md:text-base">
                  지친 일상 한가운데서 미소를 건네는 콘텐츠. 아무것도 하지 않아도 괜찮다고 말하는 이야기. 비버하우스는 치열한 댐 너머, 당신만의 안식처가 되겠습니다.
                </p>
              </div>
            </div>

            <div
              id="logo-section"
              ref={(el) => { sectionRefs.current['logo-section'] = el; }}
              className={`mb-12 md:mb-16 transition-all duration-1000 delay-200 ${
                visibleSections.has('logo-section')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {/* 모바일 레이아웃 */}
              <div className="md:hidden">
                <div className="aspect-square flex items-center justify-center rounded-lg p-8 mb-4">
                  <img src="/logo.png" alt="Beaver House Logo" className="w-full max-w-xs object-contain" />
                </div>
                <h3 className="text-lg font-display font-bold mb-3">우리의 로고</h3>
                <div className="leading-relaxed space-y-4">
                  <p className="text-sm">
                    우리의 로고는 '비버의 집'에서 시작되었습니다. 비버의 집은 나뭇가지가 켜켜이 쌓여, 멀리서 보면 우리가 떠올리는 '집'의 모습과 닮아 있습니다.
                  </p>
                  <p className="text-sm">
                    그렇게 생각하고 보니 쉬지 않고 댐을 짓는 비버도 정신없이 하루를 살아가는 우리와 비슷하다 생각했습니다. 지붕 밑 비버처럼 지붕 밑 우리들. 사람의 공간이자 비버의 공간, 일하는 존재의 집이자 쉬는 존재의 집이라는 의미를 담고 있습니다.
                  </p>
                </div>
              </div>

              {/* 태블릿 레이아웃 */}
              <div className="hidden md:flex md:gap-6 md:items-stretch">
                {/* 로고 - 1/3 */}
                <div className="md:w-1/3 flex items-center justify-center rounded-lg p-6">
                  <img src="/logo.png" alt="Beaver House Logo" className="w-full object-contain" />
                </div>
                
                {/* 텍스트 - 2/3 */}
                <div className="md:w-2/3 flex flex-col justify-center">
                  <h3 className="text-xl font-display font-bold mb-3">우리의 로고</h3>
                  <div className="text-base leading-relaxed space-y-3">
                    <p>
                      우리의 로고는 '비버의 집'에서 시작되었습니다. 비버의 집은 나뭇가지가 켜켜이 쌓여, 멀리서 보면 우리가 떠올리는 '집'의 모습과 닮아 있습니다.
                    </p>
                    <p>
                      그렇게 생각하고 보니 쉬지 않고 댐을 짓는 비버도 정신없이 하루를 살아가는 우리와 비슷하다 생각했습니다. 지붕 밑 비버처럼 지붕 밑 우리들. 사람의 공간이자 비버의 공간, 일하는 존재의 집이자 쉬는 존재의 집이라는 의미를 담고 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="character-section"
              ref={(el) => { sectionRefs.current['character-section'] = el; }}
              className={`mb-12 md:mb-16 transition-all duration-1000 delay-300 ${
                visibleSections.has('character-section')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-gray-100 aspect-video mb-4 flex items-center justify-center rounded-lg">
                <p className="text-gray-400 text-sm md:text-base">BEAVER CHARACTER IMAGE</p>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-3">비버 캐릭터</h3>
              <p className="text-sm md:text-base leading-relaxed">
                비버는 댐을 짓는 동물입니다. 살아갈 보금자리를 만들기 위해 끊임없이 나무를 모아 쌓습니다. 쉬지 않고 움직이며 집을 만들어내는 모습은 오늘을 치열하게 살아가고, '나의 집'으로 돌아가는 우리와 닮아 있습니다.
              </p>
            </div>
          </section>

          <section className="px-4 mb-20 md:mb-24 max-w-3xl mx-auto">
            <div className='border-y border-gray-200 mb-8 md:mb-10'></div>
            <div
              id="events-section"
              ref={(el) => { sectionRefs.current['events-section'] = el; }}
              className={`transition-all duration-1000 ${
                visibleSections.has('events-section')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 md:mb-6">진행중 이벤트</h3>
              <div className="space-y-6">
                <div>
                  <div className="bg-gray-100 aspect-video mb-3 flex items-center justify-center rounded-lg">
                    <p className="text-gray-400 text-sm md:text-base">EVENT IMAGE 1</p>
                  </div>
                  <h4 className="font-display font-bold mb-2 text-base md:text-lg">신상품 런칭 기념 이벤트</h4>
                  <p className="text-sm md:text-base text-gray-600">비버하우스 신상품 출시를 기념하여 특별한 혜택을 준비했습니다</p>
                </div>
                <div>
                  <div className="bg-gray-100 aspect-video mb-3 flex items-center justify-center rounded-lg">
                    <p className="text-gray-400 text-sm md:text-base">EVENT IMAGE 2</p>
                  </div>
                  <h4 className="font-display font-bold mb-2 text-base md:text-lg">홍대 팝업스토어 오픈</h4>
                  <p className="text-sm md:text-base text-gray-600">2월 한 달간 홍대에서 비버하우스를 만나보세요</p>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }

    if (activeTab === 'goods') {
      return (
        <section className="px-4 pt-4 max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-6">전체 굿즈</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allProducts.map((product) => (
              <div key={product.id} className="transition-transform duration-300 cursor-pointer">
                <div
                  className="aspect-square mb-2 rounded-lg"
                  style={{ backgroundColor: product.bgColor }}
                ></div>
                <p className="text-xs md:text-sm text-gray-500 mb-1">{product.category}</p>
                <p className="text-sm md:text-base font-medium mb-1">{product.name}</p>
                <p className="text-sm md:text-base font-bold">{product.price}원</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'popup') {
      return (
        <section className="px-4 pt-4 max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-6">팝업스토어</h2>
          <div className="space-y-4">
            {popupStores.map((popup) => (
              <div
                key={popup.id}
                className="p-6 rounded-lg transition-transform duration-300"
                style={{ backgroundColor: popup.bgColor }}
              >
                <h3 className="text-lg md:text-xl font-display font-bold mb-2">{popup.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3">{popup.date}</p>
                <p className="text-sm md:text-base">서울시 마포구 홍익로 123</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'my') {
      return (
        <section className="px-4 pt-4 max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-display font-bold mb-6 md:mb-8">마이페이지</h2>
          <div className="space-y-4">
            <button className="w-full text-left py-3 md:py-4 border-b text-sm md:text-base transition-colors">주문 내역</button>
            <button className="w-full text-left py-3 md:py-4 border-b text-sm md:text-base transition-colors">배송 조회</button>
            <button className="w-full text-left py-3 md:py-4 border-b text-sm md:text-base transition-colors">찜한 상품</button>
            <button className="w-full text-left py-3 md:py-4 border-b text-sm md:text-base transition-colors">고객센터</button>
          </div>
        </section>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white z-40 h-14 md:h-16 border-b">
        {/* 메뉴 버튼 */}
        <button
          onClick={() => setMenuOpen(true)}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2"
        >
          <Menu size={24} />
        </button>
        {/* 가운데 타이틀 */}
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl font-display font-bold">
          BEAVER HOUSE
        </h1>
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
        
        <nav className="flex flex-col items-start justify-center h-full px-12 md:px-16">
          {[
            { text: 'HOME', delay: 0 },
            { text: 'SHOP', delay: 100 },
            { text: 'POPUP STORE', delay: 200 },
            { text: 'ABOUT BEAVER', delay: 300 },
            { text: 'NOTICE', delay: 400 },
            { text: 'CONTACT', delay: 500 },
          ].map((item) => (
            <button
              key={item.text}
              className={`text-white text-4xl md:text-5xl font-display font-bold mb-8 md:mb-9 text-left transition-all duration-700 ${
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
      <main className="pt-14 md:pt-16 pb-20 md:pb-8">{renderContent()}</main>

      {/* 푸터 */}
      <footer className="bg-black text-white px-4 md:px-6 py-10 md:py-12 text-sm md:text-base">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <p className="font-display font-bold text-lg md:text-xl mb-4">BEAVER HOUSE</p>
            <div className="text-gray-400 space-y-1 text-sm md:text-base mb-6">
              <p>대표: 홍길동</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고: 2026-서울마포-0001</p>
              <p>주소: 서울시 마포구 비버로 123</p>
            </div>
            
            <div className="text-gray-400 space-y-1 text-sm md:text-base mb-6">
              <p>이메일: contact@beaverhouse.co.kr</p>
              <p>고객센터: 02-1234-5678</p>
              <p className="text-xs md:text-sm">평일 10:00-18:00 (주말 및 공휴일 휴무)</p>
            </div>

            <div className="flex gap-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={24} />
              </a>
            </div>
            
            <div className="flex gap-4 text-xs md:text-sm text-gray-400 mb-6">
              <button className="hover:text-white transition-colors">이용약관</button>
              <button className="font-bold text-white">개인정보처리방침</button>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-500">© 2026 BEAVER HOUSE. All rights reserved.</p>
        </div>
      </footer>

      {/* 하단 네비게이션 - 모바일만 표시 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 md:hidden">
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
        @font-face {
            font-family: 'OmuDaye';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
            font-weight: normal;
            font-display: swap;
        }

        .font-display {
          font-family: 'OmuDaye', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }

        .swiper-pagination-bullet {
          background: rgba(0, 0, 0, 0.3);
        }
        .swiper-pagination-bullet-active {
          background: black;
        }

        .hero-swiper .swiper-slide {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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
      `}</style>
    </div>
  );
}