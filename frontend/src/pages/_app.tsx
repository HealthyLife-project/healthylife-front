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
  //const [token, setToken] = useState([""]);

  // useEffect(() => {
  //   api
  //     .get("/auth/cookie")
  //     .then((res) => {
  //       const user = res.data.user;

  //       console.log("app user", user);
  //       setToken(user);
  //       dispatch(setTokenList(user));
  //     })
  //     .catch((err) => {
  //       console.log("쿠키 인증 실패", err);
  //     });
  // }, []);
  useEffect(() => {
    api
      .get("/auth/cookie")
      .then((res) => {
        const user = res.data.user; // user가 null일 수도 있음
        console.log("받은 유저:", res.data);
        dispatch(setTokenList(user)); // null이면 null 그대로 넣음
      })
      .catch((err) => {
        console.log("쿠키 인증 실패:", err);
        dispatch(setTokenList(null)); // 오류 시에도 null로 설정
      });
  }, [dispatch]);

  return null;
};
