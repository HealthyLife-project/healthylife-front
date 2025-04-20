import { RootState } from "@/redux/store";
import api from "@/util/chek";
import router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { openNotificationWithIcon } from "@/util/notification";

export function SuccessPage() {
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [id, setId] = useState(tokenList?.id);
  const [notifi, contextHolder] = notification.useNotification();

  //useEffect
  useEffect(() => {
    setId(tokenList?.id);
  }, []);

  // 서버로 승인 요청
  useEffect(() => {
    const id = tokenList?.id;
    if (!id) return;
    api
      .get(`/user/premium/${id}`)
      .then((res) => {
        openNotificationWithIcon("success", "결제에 성공했습니다.");
        router.push("/");
      })
      .catch((error: string) => {
        console.log("결제 성공 후 백엔드 수정 요청 error", error);
      });
  }, [tokenList]);

  return <div> {contextHolder}</div>;
}
