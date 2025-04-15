import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

// 환경변수로 설정된 클라이언트 키
const clientKey: string = process.env.NEXT_PUBLIC_TOSS_CLIENTKEY!;
const customerKey: string = process.env.NEXT_PUBLIC_TOSS_CUSTOMERKEY!;

// 금액 타입 정의
type AmountType = {
  currency: "KRW";
  value: number;
};

export default function CheckoutPage() {
  const [amount, setAmount] = useState<AmountType>({
    currency: "KRW",
    value: 100,
  });

  const [ready, setReady] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<any>(null);

  // Toss 결제 위젯 초기화
  useEffect(() => {
    async function fetchPaymentWidgets() {
      if (!clientKey || !customerKey) {
        throw new Error("Toss 키가 누락되었습니다.");
      }

      const tossPayments = await loadTossPayments(clientKey);
      const widgetsInstance = tossPayments.widgets({ customerKey });

      setWidgets(widgetsInstance);
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  // 결제 위젯 렌더링
  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  // 결제 금액 변경 시 반영
  useEffect(() => {
    if (!widgets) return;
    widgets.setAmount(amount);
  }, [amount, widgets]);

  // 결제 요청 함수
  const handlePayment = async () => {
    if (!widgets) return;

    try {
      await widgets.requestPayment({
        orderId: "sdfsffsf",
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
      });
    } catch (error) {
      console.error("결제 중 오류 발생:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />

        {/* 이용약관 UI */}
        <div id="agreement" />

        {/* 결제 버튼 */}
        <button className="button" disabled={!ready} onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}
