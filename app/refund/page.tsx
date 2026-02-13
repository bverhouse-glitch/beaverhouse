// app/refund/page.tsx
export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">환불 및 교환 정책</h1>
        
        <div className="prose prose-sm max-w-none space-y-8 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">1. 교환 및 반품이 가능한 경우</h2>
            <p>다음의 경우 상품 수령 후 7일 이내에 교환 및 반품이 가능합니다.</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>배송된 상품이 주문 내용과 다른 경우</li>
              <li>배송된 상품이 파손, 손상되었거나 오염된 경우</li>
              <li>상품의 내용이 표시·광고의 내용과 다르거나 계약 내용과 다르게 이행된 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">2. 교환 및 반품이 불가능한 경우</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>이용자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우</li>
              <li>이용자의 사용 또는 일부 소비에 의하여 상품 등의 가치가 현저히 감소한 경우</li>
              <li>시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우</li>
              <li>복제가 가능한 상품 등의 포장을 훼손한 경우</li>
              <li>주문 제작 상품의 경우 (커스텀 제작 상품 등)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">3. 교환 및 반품 절차</h2>
            <ol className="list-decimal list-inside ml-4 space-y-2">
              <li>고객센터(이메일: bverhouse@gmail.com)로 교환/반품 신청</li>
              <li>회사의 교환/반품 승인 확인</li>
              <li>상품 반송 (회사가 지정한 방법으로)</li>
              <li>반송 상품 도착 확인 후 교환 상품 발송 또는 환불 처리</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">4. 반품 배송비</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>단순 변심에 의한 반품: 고객 부담</li>
              <li>상품 하자, 오배송 등 회사 귀책사유: 회사 부담</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">5. 환불 처리</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>환불은 상품 회수 확인 후 영업일 기준 3~5일 이내 처리됩니다.</li>
              <li>신용카드 결제: 카드사 승인 취소</li>
              <li>계좌이체/무통장입금: 고객 지정 계좌로 환불</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">6. 주문 제작 상품 (커스텀 제작)</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>주문 제작 상품은 제작 시작 전까지만 취소 가능합니다.</li>
              <li>제작 시작 후에는 취소, 교환, 반품이 불가능합니다.</li>
              <li>단, 상품의 하자가 있는 경우에는 교환 또는 환불이 가능합니다.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-3 text-black">7. 배송 관련 안내</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>제작 기간</strong>: 주문 후 영업일 기준 7~14일 소요</li>
              <li><strong>배송 기간</strong>: 제작 완료 후 출고 시 영업일 기준 3~7일 소요</li>
              <li><strong>총 예상 기간</strong>: 주문 후 약 2~3주 소요 예상</li>
              <li>도서산간 지역은 배송이 2~3일 추가 소요될 수 있습니다.</li>
              <li>제작 상황에 따라 배송이 지연될 수 있으며, 지연 시 개별 안내드립니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">8. 문의</h2>
            <p>교환 및 반품 관련 문의사항은 아래로 연락 주시기 바랍니다.</p>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <ul className="space-y-1">
                <li>이메일: bverhouse@gmail.com</li>
                <li>운영시간: 평일 10:00 - 18:00 (주말 및 공휴일 휴무)</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-50 p-4 rounded">
            <p className="font-medium">최종 수정일: 2026년 2월 11일</p>
          </section>

        </div>
      </div>
    </div>
  );
}