// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTokenList } from "@/redux/redux";
import api from "@/util/chek";
import ChatBox from "@/features/ChatBox/Main";
import { ThemeProvider } from "styled-components";
import lightTheme from "@/theme/light";
import darkTheme from "@/theme/dark";
import { selectTheme } from "@/redux/theme";

// 채팅방 모달 컴포넌트
const ChatBoxWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [roomid, setRoomid] = useState();
  const [category, setCategory] = useState("");

  // 새로고침 시 유지
  useEffect(() => {
    const localChat = localStorage.getItem("ChatBox");
    if (localChat) {
      try {
        const parsed = JSON.parse(localChat);
        setChatTitle(parsed.title);
        setRoomid(parsed.roomid);
        setIsOpen(parsed.isOpen);
        setCategory(parsed.category);
      } catch (err) {
        console.error("localStorage JSON 파싱 에러:", err);
      }
    }
  }, []);

  // 모달 닫기
  const handleClose = () => {
    localStorage.removeItem("ChatBox");
    setIsOpen(false);
  };

  // 외부에서 열기 이벤트
  useEffect(() => {
    const handleOpenChat = (e: CustomEvent) => {
      const { title, roomid, category } = e.detail;
      setChatTitle(title);
      setIsOpen(true);
      setRoomid(roomid);
      setCategory(category);
      localStorage.setItem(
        "ChatBox",
        JSON.stringify({
          isOpen: true,
          title,
          roomid,
          category,
        })
      );
    };

    window.addEventListener("openChat", handleOpenChat as EventListener);
    return () => {
      window.removeEventListener("openChat", handleOpenChat as EventListener);
    };
  }, []);

  if (!isOpen) return null;
  return <ChatBox title={chatTitle} onClose={handleClose} />;
};

// Redux Provider를 최상단에 위치
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <AppWithTheme
        Component={Component}
        pageProps={pageProps}
        router={router}
      />
    </Provider>
  );
}

// 실제 앱 로직은 Provider 내부에서 처리
const AppWithTheme = ({ Component, pageProps }: AppProps) => {
  const theme = useSelector(selectTheme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <InitToken />
      <Component {...pageProps} />
      <ChatBoxWrapper />
      {/* <Loading /> */}
    </ThemeProvider>
  );
};

// 초기 토큰 세팅 컴포넌트
const InitToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/auth/cookie")
      .then((res) => {
        const user = res.data.user;
        dispatch(setTokenList(user));
      })
      .catch((err) => {
        dispatch(setTokenList(null));
      });
  }, [dispatch]);

  return null;
};
