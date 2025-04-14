import { RootState } from "@/redux/store";
import api from "@/util/chek";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export function SuccessPage() {
  //const [searchParams] = useSearchParams();
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [id, setId] = useState();

  //useEffect
  useEffect(() => {
    setId(tokenList?.id);
  }, []);

  // 서버로 승인 요청

  api
    .post(`/pay/success/${id}`)
    .then((res) => {
      console.log("res", res.data);
    })
    .catch((error: string) => {
      console.log("결제 성공 후 백엔드 수정 요청 error", error);
    });

  return (
    <div>
      {/* <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div> */}
      결제성공페이지
    </div>
  );
}
