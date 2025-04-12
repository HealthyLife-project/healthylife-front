import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTokenList } from "@/redux/redux";
import api from "@/util/chek";
import ChatBox from "@/features/ChatBox/Main";
import Loading from "@/components/Loading";
//채팅방 모달 컴포넌트
const ChatBoxWrapper = () => {
  const [isOpen, setIsOpen] = useState(false); //채팅방 클릭 유무
  const [chatTitle, setChatTitle] = useState(""); //채탕방 이름
  const [roomid, setRoomid] = useState();
  const [category, setCategory] = useState("");

  //새로 고침 시 모달 컴포넌트 유지 확인용
  useEffect(() => {
    const localChat = localStorage.getItem("ChatBox");
    //console.log("local 실행중 ");

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
  }, [isOpen]);

  //모달 컴포넌트 닫기 클릭
  const handleClose = () => {
    localStorage.removeItem("ChatBox");
    setIsOpen(false);
  };

  // 외부에서 ChatBox 열기 위한 이벤트 리스너
  useEffect(() => {
    const handleOpenChat = (e: CustomEvent) => {
      //사용자 정의 이벤트
      const { title, roomid, category } = e.detail;

      //타이틀 및 open 여부 확인
      setChatTitle(title);
      setIsOpen(true);
      setRoomid(roomid);
      setCategory(category);
      //로컬 스토리지 저장
      localStorage.setItem(
        "ChatBox",
        JSON.stringify({
          isOpen: true,
          title: title,
          roomid: roomid,
          category: category,
        })
      );
    };

    //해당 이벤트리스너가 실행시 함수 실행
    window.addEventListener("openChat", handleOpenChat as EventListener);

    return () => {
      window.removeEventListener("openChat", handleOpenChat as EventListener);
    };
  }, []);

  if (!isOpen) return null;

  return <ChatBox title={chatTitle} onClose={handleClose} />;
};

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Provider store={store}>
      <InitToken />
      <Component {...pageProps} />
      <ChatBoxWrapper />
      {/* <Loading /> */}
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
