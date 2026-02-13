// app/support/page.tsx
'use client';

import { useState } from 'react';
import { Send, Mail, ChevronDown, Check } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 'shipping-time',
    question: '배송은 얼마나 걸리나요?',
    answer: `주문 제작 방식으로 운영되어 약 2-3주 소요됩니다.

- 제작 기간: 영업일 기준 7~14일
- 배송 기간: 제작 완료 후 3~7일

제작 상황에 따라 지연될 수 있으며, 출고 시 개별 안내 드립니다.`
  },
  {
    id: 'return',
    question: '교환/반품은 어떻게 하나요?',
    answer: `상품 수령 후 7일 이내 가능합니다.

교환/반품 가능한 경우
- 상품이 파손/손상된 경우
- 주문 내용과 다른 상품을 받은 경우
- 상품 설명과 다른 경우

불가능한 경우
- 주문 제작 상품 (제작 시작 후)
- 포장 훼손된 경우
- 사용/세탁한 상품

고객센터(bverhouse@gmail.com)로 문의 주시면 안내드립니다.`
  },
  {
    id: 'tracking',
    question: '배송 조회는 어떻게 하나요?',
    answer: `마이페이지 > 주문내역에서 확인 가능합니다.

- 입금 확인: 주문 접수 전
- 제작 중: 현재 제작 진행 상황
- 출고 완료: 송장번호 및 택배사 정보 제공
- 배송 중: 실시간 배송 조회 가능

출고 시 문자로도 안내드립니다.`
  },
  {
    id: 'restock',
    question: '품절된 상품 재입고 예정은?',
    answer: `품절 상품은 재입고 알림 신청이 가능합니다.

품절 상품 페이지에서 "재입고 알림 신청" 버튼을 클릭하시면
재입고 시 이메일/문자로 안내드립니다.

재입고 일정은 상황에 따라 달라질 수 있습니다.`
  },
];

export default function SupportPage() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '상품문의',
    orderNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 여기에 구글 시트 Apps Script URL 넣기
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwk8MNbAeqVcRW45SJ96xVSiZ1u3fNOzPPuI5u9vjgiX3NZb9FtZkbAg43NZrkw-cwHog/exec';
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script 때문에 필요
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // no-cors 모드에서는 response 확인 불가
      // 일단 성공으로 간주
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        type: '상품문의',
        orderNumber: '',
        message: ''
      });

      setTimeout(() => setIsSubmitted(false), 3000);
      
    } catch (error) {
      console.error('전송 실패:', error);
      alert('문의 전송 중 오류가 발생했습니다. 이메일(bverhouse@gmail.com)로 직접 문의해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* 헤더 */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-3">고객센터</h1>
          <p className="text-gray-600">
            궁금하신 점이 있으신가요?<br />
            FAQ를 먼저 확인해보시거나 아래 양식으로 문의해주세요.
          </p>
        </div>

        {/* 빠른 연락 */}
        <div className="mb-12 bg-gray-50 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">빠른 연락</h2>
          <div className="space-y-3">
            <a
              href="mailto:bverhouse@gmail.com"
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <p className="font-semibold text-sm">이메일 문의</p>
                <p className="text-xs text-gray-500">bverhouse@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-sm">운영 시간</p>
                <p className="text-xs text-gray-500">평일 10:00 - 18:00 (주말·공휴일 휴무)</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-semibold text-sm pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform flex-shrink-0 ${
                      openFaqId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqId === faq.id ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5 pt-2 bg-gray-50 border-t">
                    <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 문의하기 폼 */}
        <div className="border rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">1:1 문의하기</h2>
          
          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <Check size={20} className="text-green-600" />
              <p className="text-sm text-green-700">
                문의가 접수되었습니다. 영업일 기준 1-2일 내 답변드리겠습니다.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이름 */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="홍길동"
              />
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="example@email.com"
              />
            </div>

            {/* 문의 유형 */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                문의 유형 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="상품문의">상품문의</option>
                <option value="배송문의">배송문의</option>
                <option value="주문/결제">주문/결제</option>
                <option value="교환/환불">교환/환불</option>
                <option value="기타">기타</option>
              </select>
            </div>

            {/* 주문번호 */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                주문번호 (선택사항)
              </label>
              <input
                type="text"
                value={formData.orderNumber}
                onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="예: BH20260214001"
              />
            </div>

            {/* 문의 내용 */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                문의 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                placeholder="문의 내용을 상세히 적어주시면 더 정확한 답변을 드릴 수 있습니다."
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>처리 중...</>
              ) : (
                <>
                  <Send size={18} />
                  문의하기
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            영업일 기준 1-2일 내 이메일로 답변드립니다.
          </p>
        </div>

      </div>
    </div>
  );
}