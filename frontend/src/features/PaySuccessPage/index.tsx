import { RootState } from "@/redux/store";
import api from "@/util/chek";
import router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function SuccessPage() {
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [id, setId] = useState(tokenList?.id);

  //useEffect
  useEffect(() => {
    setId(tokenList?.id);
  }, [tokenList]);

  // 서버로 승인 요청
  //console.log("ud", id);
  api
    .get(`/user/premium/${id}`)
    .then((res) => {
      //console.log("res", res.data);
      router.push("/");
    })
    .catch((error: string) => {
      console.log("결제 성공 후 백엔드 수정 요청 error", error);
    });

  return <div>결제성공페이지</div>;
}
