'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert('회원가입이 완료되었습니다.');
      router.push('/my');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-10 border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link href="/my/login" className="text-2xl">←</Link>
          <h1 className="flex-1 text-center text-lg font-bold">회원가입</h1>
          <div className="w-8" />
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center px-4 pb-20">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">BEAVER HOUSE</h2>
            <p className="text-sm text-gray-600">새로운 시작을 환영합니다</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
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
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? '가입 중…' : '회원가입'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
