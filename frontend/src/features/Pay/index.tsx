import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { Button } from "antd";
import { PayStyle } from "./styled";
import uuid from "react-uuid";

// 환경변수로 설정된 클라이언트 키
const clientKey: string = process.env.NEXT_PUBLIC_TOSS_CLIENTKEY!;
const customerKey: string = process.env.NEXT_PUBLIC_TOSS_CUSTOMERKEY!;

// 금액 타입 정의
type AmountType = {
  currency: "KRW";
  value: number;
};

export default function CheckoutPage(props: {
  id: number;
  userName: string;
  phone: string;
  email: string;
}) {
  const { id, userName, phone, email } = props;

  const [amount, setAmount] = useState<AmountType>({
    currency: "KRW",
    value: 5500,
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
        orderId: uuid(),
        orderName: "구독",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: `${email}`,
        customerName: `${userName}`,
        customerMobilePhone: `${phone}`,
      });
    } catch (error) {
      console.error("결제 중 오류 발생:", error);
    }
  };

  return (
    <PayStyle>
      <div className="wrapper">
        <div className="box_section">
          {/* 결제 UI */}
          <div id="payment-method" />

          {/* 이용약관 UI */}
          <div id="agreement" />

          {/* 결제 버튼 */}
          <div className="pay-btn">
            <Button
              className="button"
              disabled={!ready}
              onClick={handlePayment}
            >
              결제하기
            </Button>
          </div>
        </div>
      </div>
    </PayStyle>
  );
}
