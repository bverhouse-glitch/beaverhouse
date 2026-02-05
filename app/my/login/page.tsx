'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 임시 로그인 로직
    router.push('/my');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-10 border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link href="/my" className="text-2xl">←</Link>
          <h1 className="flex-1 text-center text-lg font-display font-bold">로그인</h1>
          <div className="w-8"></div>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center px-4 pb-20">
        <div className="max-w-md mx-auto w-full">
          {/* 로고 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-2">BEAVER HOUSE</h2>
            <p className="text-sm text-gray-600">오늘도 수고한 당신에게</p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg text-sm"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg text-sm"
            />
            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-lg font-bold"
            >
              로그인
            </button>
          </form>

          {/* 기타 옵션 */}
          <div className="flex justify-center gap-4 text-sm text-gray-600 mb-8">
            <Link href="#">아이디 찾기</Link>
            <span>|</span>
            <Link href="#">비밀번호 찾기</Link>
            <span>|</span>
            <Link href="#">회원가입</Link>
          </div>

          {/* 소셜 로그인 */}
          <div className="space-y-3">
            <button className="w-full py-4 border rounded-lg text-sm font-medium flex items-center justify-center gap-2">
              <span>🍎</span>
              Apple로 계속하기
            </button>
            <button className="w-full py-4 border rounded-lg text-sm font-medium flex items-center justify-center gap-2">
              <span>G</span>
              Google로 계속하기
            </button>
            <button className="w-full py-4 bg-[#FEE500] rounded-lg text-sm font-medium flex items-center justify-center gap-2">
              <span>💬</span>
              카카오로 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}