import clsx from "clsx";
import { ChatBoxStyled, theme } from "./styled";
import { Button, Input, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import { SearchProps } from "antd/es/input";
import socket from "@/util/socket";
import { join } from "path";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

//title 기본 채팅방 interface
interface ChatBoxProps {
  title: string;
  onClose: () => void;
}
//전역 변수 설정
//const { Search } = Input;

//채팅방 > 메인 컴포넌트
const ChatBox = ({ title, onClose }: ChatBoxProps) => {
  //변수 선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [username, setUsername] = useState(tokenList.name); //유저 이름
  const [message, setMessage] = useState(""); //보낸 메시지
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]); //메시지 전체
  const [users, setUsers] = useState<string[]>([]); //입장한 유저 목록
  const [room, setRoom] = useState(title); //방 이름
  const [joined, setJoined] = useState(false);

  //useEffect
  useEffect(() => {
    const chatBox = localStorage.getItem("ChatBox");
    const chatData = chatBox ? JSON.parse(chatBox) : null;
    if (chatData) {
      joinRoom();
      console.log(chatData.message ? "메세지 있음" : "메세지 없음");
    }
    console.log("입장여부 확인", socket.connected);

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
  //메시지 보내기
  const sendMessage = () => {
    //console.log("chat  :", room, username, message);
    if (message.trim()) {
      socket.emit("sendMessage", { room, username, message });
      setMessage("");
    }
  };
  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      socket.emit("joinRoom", { room });
      setJoined(true); // 채팅방 생성
    }
  };
  //전송 버튼 클릭 함수(추후 변수명 변경)
  // const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  //   console.log(info?.source, value);

  return (
    <ChatBoxStyled className={clsx("main-wrap")}>
      <div className="title">
        <span>{title}</span>
        <Button
          onClick={onClose}
          size="small"
          className="close-btn"
          type="text"
        >
          ✕
        </Button>
      </div>
      <div>
        <span>접속 중인 사용자</span>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="content">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username}: </strong> {msg.message}
          </p>
        ))}
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
    </ChatBoxStyled>
  );
};
export default ChatBox;
