//토스용 컴포넌트
import { useEffect, useRef, useState } from "react";
import { PayStyle } from "./styled"; //스타일
import clsx from "clsx";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { nanoid } from "nanoid";

//Component

//toss key
const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENTKEY;
const customerKey = process.env.NEXT_PUBLIC_TOSS_CUSTOMERKEY;

//origin url
const origin = "http://localhost:3000";

//마이페이지 > 토스 결제 컴포넌트
const Pay = () => {
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 100,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        // ------  SDK 초기화 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
        const tossPayments = await loadTossPayments(clientKey);
        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentswidgets
        const widgets = tossPayments.widgets({
          customerKey,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }
    fetchPaymentWidgets();
  }, [clientKey, customerKey]);
  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------  주문서의 결제 금액 설정 ------
      // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
      // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
      await widgets.setAmount(amount);
      // ------  결제 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
      await widgets.renderPaymentMethods({
        selector: "#payment-method",
        // 렌더링하고 싶은 결제 UI의 variantKey
        // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
        // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
        variantKey: "DEFAULT",
      });
      // ------  이용약관 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
      // await widgets.renderAgreement({
      //   selector: "#agreement",
      //   variantKey: "AGREEMENT",
      // });
      setReady(true);
    }
    renderPaymentWidgets();
  }, [widgets]);
  const updateAmount = async (amount) => {
    setAmount(amount);
    await widgets.setAmount(amount);
  };
  async function pay() {
    try {
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      await widgets.requestPayment({
        orderId: nanoid(),
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
      });
    } catch (error) {
      // 에러 처리하기
      console.error(error);
    }
  }
  return (
    <PayStyle>
      <div id="payment-method"></div>
      {/* 이용약관 UI */}
      <div id="agreement"></div>
      {/* 결제하기 버튼 */}
      <button
        className="button"
        style={{ marginTop: "30px" }}
        disabled={!ready}
        // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
        onClick={() => {
          pay();
        }}
      >
        결제하기
      </button>
    </PayStyle>
  );
};
export default Pay;
