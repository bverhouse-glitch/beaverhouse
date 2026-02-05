import { Menu, X, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onMenuOpen: () => void;
}

export function Header({ onMenuOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40 h-14 md:h-16 border-b">
      <button
        onClick={onMenuOpen}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2"
      >
        <Menu size={24} />
      </button>
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl font-display font-bold">
        BEAVER HOUSE
      </h1>
    </header>
  );
}

interface FullMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FullMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullMenu({ isOpen, onClose }: FullMenuProps) {
  const menuItems = [
    { text: 'HOME', href: '/', delay: 0 },
    { text: 'SHOP', href: '/goods', delay: 100 },
    { text: 'POPUP STORE', href: '/popup', delay: 200 },
    { text: 'ABOUT BEAVER', delay: 300 },
    { text: 'NOTICE', delay: 400 },
    { text: 'CONTACT', delay: 500 },
  ];

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 bg-black transition-all duration-500
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* 메뉴 */}
      <nav className="flex h-full flex-col justify-center px-12 md:px-16">
        {menuItems.map((item) => {
          const commonClass = `
            text-white text-4xl md:text-5xl font-display font-bold
            mb-8 md:mb-9 text-left
            transition-all duration-700
            ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
          `;

          const style = {
            transitionDelay: isOpen ? `${item.delay}ms` : '0ms',
          };

          if (item.href) {
            return (
              <Link
                key={item.text}
                href={item.href}
                onClick={onClose}
                className={commonClass}
                style={style}
              >
                {item.text}
              </Link>
            );
          }

          return (
            <button
              key={item.text}
              type="button"
              onClick={onClose}
              className={commonClass}
              style={style}
            >
              {item.text}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function Footer() {
  return (
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
  );
}

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 md:hidden">
      <div className="flex">
        <button
          onClick={() => onTabChange('home')}
          className={`flex-1 py-3 text-center text-xs ${
            activeTab === 'home' ? 'text-black font-medium' : 'text-gray-400'
          }`}
        >
          홈
        </button>
        <button
          onClick={() => onTabChange('goods')}
          className={`flex-1 py-3 text-center text-xs ${
            activeTab === 'goods' ? 'text-black font-medium' : 'text-gray-400'
          }`}
        >
          상점
        </button>
        <button
          onClick={() => onTabChange('popup')}
          className={`flex-1 py-3 text-center text-xs ${
            activeTab === 'popup' ? 'text-black font-medium' : 'text-gray-400'
          }`}
        >
          팝업
        </button>
        <button
          onClick={() => onTabChange('my')}
          className={`flex-1 py-3 text-center text-xs ${
            activeTab === 'my' ? 'text-black font-medium' : 'text-gray-400'
          }`}
        >
          MY
        </button>
      </div>
    </nav>
  );
}