import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setTokenList } from "@/redux/redux";
import api from "@/util/chek";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <InitToken /> {/* Redux에 토큰 저장 */}
      <Component {...pageProps} />
    </Provider>
  );
}

// Redux에서 dispatch를 사용하기 위한 내부 컴포넌트
const InitToken = () => {
  const dispatch = useDispatch();

  //새로고침 시 헤더 유지
  useEffect(() => {
    api
      .get("/auth/cookie")
      .then((res) => {
        const user = res.data.user;
        //console.log("받은 유저:", res.data);
        dispatch(setTokenList(user));
      })
      .catch((err) => {
        //console.log("쿠키 인증 실패:", err);
        dispatch(setTokenList(null));
      });
  }, []);

  return null;
};
