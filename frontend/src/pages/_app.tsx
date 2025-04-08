import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTokenList } from "@/redux/redux";
import api from "@/util/chek";
import ChatBox from "@/features/ChatBox/Main";

function ChatBoxWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState("");

  useEffect(() => {
    const localChat = localStorage.getItem("ChatBox");
    console.log("local 실행중 ");
    if (localChat) {
      try {
        const parsed = JSON.parse(localChat);
        setChatTitle(parsed.title);
        setIsOpen(parsed.isOpen);
      } catch (err) {
        console.error("localStorage JSON 파싱 에러:", err);
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    localStorage.removeItem("ChatBox");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return <ChatBox title={chatTitle} onClose={handleClose} />;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <InitToken />
      <Component {...pageProps} />
      <ChatBoxWrapper />
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
