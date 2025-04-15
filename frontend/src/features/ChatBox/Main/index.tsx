import clsx from "clsx";
import { ChatBoxStyled, theme } from "./styled";
import { Button, Input, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import { SearchProps } from "antd/es/input";
import socket from "@/util/socket";
import { join } from "path";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import api from "@/util/chek";

//image
import arrowback from "@/assets/images/arrowback.png";
import menu from "@/assets/images/menu.png";

//component
import ChatDrawer from "../ChatDrawer";
import router from "next/router";

//title 기본 채팅방 interface
interface ChatBoxProps {
  title: string;
  onClose: () => void;
}

//localstorage type
type ChatBoxLocal = {
  roomid: number;
  category: string;
  title: string;
  isOpen: boolean;
};

//채팅방 > 메인 컴포넌트
const ChatBox = ({ title, onClose }: ChatBoxProps) => {
  //변수 선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수
  //console.log("tolen", tokenList);

  //useState
  const [username, setUsername] = useState(""); //유저 이름
  const [userid, setUserid] = useState(); //유저 아이디
  const [userNickname, setNickname] = useState(""); //유저 닉네임
  const [message, setMessage] = useState(""); //보낸 메시지
  const [messages, setMessages] = useState<
    { userNickname: string; message: string; aopen?: string }[]
  >([]); //메시지 전체
  const [users, setUsers] = useState<string[]>([]); //입장한 유저 목록
  const [room, setRoom] = useState(title); //방 이름
  const [joined, setJoined] = useState(false);
  const [chatlocal, setChatLocal] = useState<ChatBoxLocal>(); //로컬 스토리지 값
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [chatList, setChatList] = useState<ChatBoxLocal[]>([]);

  //useEffect
  useEffect(() => {
    setUsername(tokenList?.name);
    setUserid(tokenList?.id);
    setNickname(tokenList?.nickname);

    //console.log("입장여부 확인", socket.connected);

    socket.on("receiveMessage", (data) => {
      console.log("받은메세지", data);
      setMessages((prev) => [...prev, data]);
    });

    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userList");
    };
  }, []);

  useEffect(() => {
    const chatBox = localStorage.getItem("ChatBox");

    setChatLocal(JSON.parse(chatBox!));
    const chatData: ChatBoxLocal = chatBox ? JSON.parse(chatBox) : null;

    if (chatData) {
      joinRoom(chatData);
      //console.log(chatData.message ? "메세지 있음" : "메세지 없음");
    }
  }, [username, room]);

  //방 입장하기
  const joinRoom = (chatData: ChatBoxLocal) => {
    if (userNickname.trim() && room.trim()) {
      socket.emit("joinRoom", { room });
      setJoined(true); // 채팅방 생성

      api
        .post(`/chat/${chatData.category}/insert`, {
          roomid: Number(chatData.roomid),
          userid: Number(tokenList?.id),
        })
        .then((res) => {
          console.log(res.data);
        });

      if (!chatData.isOpen) {
        socket.emit("sendMessage", {
          room,
          username,
          message,
          aopen: `${userNickname}님이 입장하셨습니다.`,
        });
      } else {
        return;
      }
    }
  };

  //메시지 보내기
  const sendMessage = () => {
    console.log("chat  :", room, userNickname, message);
    if (message.trim()) {
      socket.emit("sendMessage", { room, userNickname, message });
      //console.log("loca", chatlocal);
      const today = new Date();

      const formatDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // 0~11이니까 +1
        const dd = String(date.getDate()).padStart(2, "0");

        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        const sec = String(date.getSeconds()).padStart(2, "0");

        return `${yyyy}.${mm}.${dd} ${hh}:${min}:${sec}`;
      };

      let arr = {
        text: message,
        userid: userid,
        userNickname: userNickname,
        time: formatDate(today),
        roomid: chatlocal?.roomid,
      };

      //console.log("chat data", arr);

      //db 저장 요청
      api
        .post(`/chat/${chatlocal?.category}/saveMessage`, arr)
        .then((res) => {
          //console.log("백엔드 저장 완료", res.data);
        })
        .catch((error: string) => {
          console.log("백엔드 저장 실패", error);
        });

      setMessage("");
    }
  };

  //drawer 열기
  const showDrawer = () => {
    const listFromStorage = localStorage.getItem("ChatBoxList");
    if (listFromStorage) {
      const parsed = JSON.parse(listFromStorage);
      setChatList(Array.isArray(parsed) ? parsed : [parsed]);
    }
    setIsChatListOpen(true);
  };

  //drawer 닫기
  const closeDrawer = () => setIsChatListOpen(false);

  const menuModal = () => {
    //console.log("df");
  };

  return (
    <>
      <ChatBoxStyled className={clsx("main-wrap")}>
        <div className="title">
          <span onClick={showDrawer}>
            <img src={arrowback.src} alt="arrow-back" />
          </span>
          <span>{title}</span>
          <div className="menu">
            <span className="menu-bar" onClick={menuModal}>
              <img src={menu.src} alt="menu" />
            </span>
            <Button
              onClick={onClose}
              size="small"
              className="close-btn"
              type="text"
            >
              ✕
            </Button>
          </div>
        </div>

        <div className="content-div">
          <div className="content">
            {messages.map((msg, index) =>
              msg.aopen ? (
                <p key={index}>
                  <strong>{msg.aopen}</strong>
                </p>
              ) : (
                <p key={index}>
                  <strong>{msg.userNickname}: </strong> {msg.message}
                </p>
              )
            )}
          </div>
          <div className="chat-input-div">
            <Input
              type="text"
              className="chat-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>전송</Button>
          </div>
        </div>
      </ChatBoxStyled>
      {isChatListOpen && (
        <ChatDrawer
          onClose={closeDrawer}
          category={chatlocal?.category || "카테고리"}
          title={title}
        />
      )}
    </>
  );
};
export default ChatBox;
