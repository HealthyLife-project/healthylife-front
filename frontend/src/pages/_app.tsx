import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setTokenList } from "@/redux/redux";

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

  useEffect(() => {
    const storedToken = Cookies.get("healthy_token");
    console.log("app cookie ", storedToken);
    if (storedToken) {
      dispatch(setTokenList(storedToken));
    }
  }, [dispatch]);

  return null;
};
