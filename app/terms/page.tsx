export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">이용약관</h1>
        
        <div className="prose prose-sm max-w-none space-y-8 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제1조 (목적)</h2>
            <p>본 약관은 비버하우스 (이하 "회사")이 운영하는 온라인 쇼핑몰에서 제공하는 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제2조 (정의)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>"쇼핑몰"이란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 운영하는 온라인 사이트 및 모바일 애플리케이션을 말합니다.</li>
              <li>"이용자"란 쇼핑몰에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
              <li>"회원"이란 쇼핑몰에 개인정보를 제공하여 회원등록을 한 자로서, 쇼핑몰의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제3조 (약관의 명시와 개정)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 쇼핑몰 마이페이지 화면에 게시합니다.</li>
              <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
              <li>약관 개정 시 적용일자 및 개정사유를 명시하여 현행약관과 함께 쇼핑몰 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제4조 (회원가입)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</li>
              <li>회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>가입신청자가 이전에 회원자격을 상실한 적이 있는 경우</li>
                  <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                  <li>허위의 정보를 기재하거나 회사가 제시하는 내용을 기재하지 않은 경우</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제5조 (서비스의 제공 및 변경)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>회사는 다음과 같은 업무를 수행합니다.
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>재화 또는 용역에 대한 정보 제공 및 구매계약의 체결</li>
                  <li>구매계약이 체결된 재화 또는 용역의 배송</li>
                  <li>기타 회사가 정하는 업무</li>
                </ul>
              </li>
              <li>회사는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제6조 (서비스의 중단)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
              <li>제1항에 의한 서비스 중단의 경우 회사는 이용자에게 통지합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제7조 (구매신청)</h2>
            <p>이용자는 쇼핑몰에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, 회사는 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.</p>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>재화 등의 검색 및 선택</li>
              <li>받는 사람의 성명, 주소, 전화번호, 전자우편주소 등의 입력</li>
              <li>약관내용, 청약철회권이 제한되는 서비스 등에 대한 확인</li>
              <li>구매신청 및 이에 관한 확인 또는 회사의 확인에 대한 동의</li>
              <li>결제방법의 선택</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제8조 (계약의 성립)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>회사는 제7조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다.
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>신청 내용에 허위, 기재누락, 오기가 있는 경우</li>
                  <li>미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우</li>
                  <li>기타 구매신청에 승낙하는 것이 기술상 현저히 지장이 있다고 판단하는 경우</li>
                </ul>
              </li>
              <li>회사의 승낙이 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제9조 (지급방법)</h2>
            <p>회사에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다.</p>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>계좌이체</li>
              <li>신용카드 결제</li>
              <li>온라인무통장입금</li>
              <li>전자화폐에 의한 결제</li>
              <li>기타 전자적 지급 방법에 의한 대금 지급 등</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제10조 (개인정보보호)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>회사는 이용자의 개인정보 수집 시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.</li>
              <li>회사는 회원가입 시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다.</li>
              <li>회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.</li>
              <li>회사는 수집된 개인정보를 목적 외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제11조 (회사의 의무)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>회사는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화·용역을 제공하는데 최선을 다하여야 합니다.</li>
              <li>회사는 이용자가 안전하게 서비스를 이용할 수 있도록 이용자의 개인정보 보호를 위한 보안 시스템을 갖추어야 합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제12조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>신청 또는 변경 시 허위 내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>회사에 게시된 정보의 변경</li>
              <li>회사가 정한 정보 이외의 정보 등의 송신 또는 게시</li>
              <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 쇼핑몰에 공개 또는 게시하는 행위</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">제13조 (분쟁해결)</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</li>
              <li>회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다.</li>
              <li>회사와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-black">부칙</h2>
            <p>본 약관은 2026년 2월 11일부터 시행합니다.</p>
          </section>

        </div>
      </div>
    </div>
  );
}