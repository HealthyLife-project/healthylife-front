import "@/styles/globals.css";
import type { AppProps } from "next/app";
import api from "@/util/chek";

//redux
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTokenList } from "@/redux/redux";
import { selectTheme } from "@/redux/theme";

//theme
import { ThemeProvider } from "styled-components";
import lightTheme from "@/theme/light";
import darkTheme from "@/theme/dark";

//컴포넌트
import Loading from "@/components/Loading";
import ChatBox from "@/features/ChatBox/Main";
import { useRouter } from "next/router";

// 채팅방 모달 컴포넌트
const ChatBoxWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState("");

  // 초기 마운트 및 storage 이벤트 감지
  useEffect(() => {
    const checkChatState = () => {
      const localChat = localStorage.getItem("ChatBox");
      if (localChat) {
        try {
          const parsed = JSON.parse(localChat);
          setIsOpen(true);
          setChatTitle(parsed.title);
        } catch (err) {
          console.error("localStorage JSON 파싱 에러:", err);
          setIsOpen(false);
        }
      } else {
        setIsOpen(false);
      }
    };

    checkChatState();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ChatBox") {
        checkChatState();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // openChat 이벤트 감지 (같은 탭에서는 storage 이벤트가 발생하지 않음)
  useEffect(() => {
    const handleOpenChat = (e: CustomEvent) => {
      const { title, roomid, category, boolean } = e.detail;

      // localStorage 저장
      localStorage.setItem(
        "ChatBox",
        JSON.stringify({ isOpen: true, title, roomid, category, boolean })
      );

      setIsOpen(true);
      setChatTitle(title);
    };

    window.addEventListener("openChat", handleOpenChat as EventListener);
    return () => {
      window.removeEventListener("openChat", handleOpenChat as EventListener);
    };
  }, []);

  // 브라우저 종료 시 ChatBox 제거
  useEffect(() => {
    const handleTabClosed = () => {
      handleClose();
    };

    window.addEventListener("beforeunload", handleTabClosed);
    return () => {
      window.removeEventListener("beforeunload", handleTabClosed);
    };
  }, []);

  const handleClose = () => {
    localStorage.removeItem("ChatBox");
    setIsOpen(false);
    setChatTitle("");
  };

  return isOpen ? <ChatBox title={chatTitle} onClose={handleClose} /> : null;
};

// Redux Provider를 최상단에 위치 - 테마
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
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <InitToken />
          <Component {...pageProps} />
        </>
      )}

      <ChatBoxWrapper />
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
      .catch((err: string) => {
        //console.log("err", err);
        dispatch(setTokenList(null));
      });
  }, [dispatch]);

  return null;
};
