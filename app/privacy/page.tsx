// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">개인정보처리방침</h1>
        
        <div className="prose prose-sm max-w-none space-y-8 text-gray-700 leading-relaxed">
          
          <p>비버하우스(이하 "회사")은 이용자의 개인정보를 중요시하며, "개인정보 보호법" 및 "정보통신망 이용촉진 및 정보보호 등에 관한 법률"을 준수하고 있습니다.</p>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">1. 수집하는 개인정보의 항목 및 수집방법</h2>
            
            <h3 className="text-base font-semibold mt-4 mb-2 text-black">가. 수집하는 개인정보의 항목</h3>
            
            <div className="ml-4 space-y-3">
              <div>
                <p className="font-medium">회원가입 시</p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>필수항목: 이름, 이메일, 비밀번호, 휴대전화번호</li>
                  <li>선택항목: 생년월일</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">상품 구매 시</p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>필수항목: 수령인 이름, 배송지 주소, 연락처</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">결제 시</p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>신용카드 결제 시: 카드번호, 유효기간 등 (PG사 처리)</li>
                  <li>계좌이체 시: 은행명, 계좌번호 등</li>
                </ul>
              </div>
            </div>

            <h3 className="text-base font-semibold mt-4 mb-2 text-black">나. 개인정보 수집방법</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>홈페이지 및 모바일 애플리케이션을 통한 회원가입 및 상품 구매 과정</li>
              <li>이메일, 전화, 팩스를 통한 수집</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">2. 개인정보의 수집 및 이용목적</h2>
            <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>

            <div className="ml-4 space-y-3 mt-3">
              <div>
                <p className="font-medium">가. 서비스 제공에 관한 계약 이행 및 요금정산</p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>콘텐츠 제공, 구매 및 요금 결제, 물품배송 또는 청구서 등 발송</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">나. 회원 관리</p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">다. 마케팅 및 광고에 활용</p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">3. 개인정보의 보유 및 이용기간</h2>
            <p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.</p>

            <div className="ml-4 space-y-3 mt-3">
              <div>
                <p className="font-medium">가. 회원 탈퇴 시</p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>탈퇴 즉시 파기 (단, 관계법령에 따라 보존할 필요가 있는 경우 일정기간 보관)</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">나. 관계법령에 따른 보관</p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                  <li>표시/광고에 관한 기록: 6개월 (전자상거래법)</li>
                  <li>로그기록: 3개월 (통신비밀보호법)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">4. 개인정보의 파기절차 및 방법</h2>

            <div className="ml-4 space-y-3">
              <div>
                <p className="font-medium">가. 파기절차</p>
                <p className="ml-4 mt-1">이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 파기됩니다.</p>
              </div>

              <div>
                <p className="font-medium">나. 파기방법</p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>전자적 파일 형태: 복구 및 재생되지 않도록 안전하게 삭제</li>
                  <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">5. 개인정보 제공</h2>
            <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>이용자들이 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">6. 개인정보의 처리 위탁</h2>
            <p>회사는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.</p>

            <div className="ml-4 space-y-2 mt-3">
              <div>
                <p className="font-medium">위탁업체: [CJ대한통운]</p>
                <p className="ml-4">위탁업무 내용: 상품 배송</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">7. 이용자 및 법정대리인의 권리와 그 행사방법</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.</li>
              <li>개인정보 조회, 수정을 위해서는 '개인정보변경'을, 가입해지를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.</li>
              <li>혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">8. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</h2>
            <p>회사는 이용자의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)'를 사용합니다.</p>
            <p className="mt-2">쿠키 설정 거부 방법: 웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">9. 개인정보의 기술적/관리적 보호 대책</h2>

            <div className="ml-4 space-y-3">
              <div>
                <p className="font-medium">가. 기술적 대책</p>
                <p className="ml-4 mt-1">개인정보는 비밀번호에 의해 보호되며, 파일 및 전송 데이터를 암호화하거나 파일 잠금기능을 사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.</p>
              </div>

              <div>
                <p className="font-medium">나. 관리적 대책</p>
                <p className="ml-4 mt-1">회사는 이용자의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">10. 개인정보관리책임자</h2>
            <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>

            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="font-medium">개인정보 보호책임자</p>
              <ul className="ml-4 mt-2 space-y-1">
                <li>성명: 이경빈</li>
                <li>이메일: bverhouse@gmail.com</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">11. 고지의 의무</h2>
            <p>현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 홈페이지의 '공지사항'을 통해 고지할 것입니다.</p>
          </section>

          <section className="bg-gray-50 p-4 rounded">
            <p className="font-medium">시행일자: 2026년 2월 11일</p>
          </section>

        </div>
      </div>
    </div>
  );
}