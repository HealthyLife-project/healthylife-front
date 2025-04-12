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
  //console.log("tolen", tokenList);

  //useState
  const [username, setUsername] = useState(tokenList.name); //유저 이름
  const [userid, setUserid] = useState(tokenList.id); //유저 아이디
  const [userNickname, setNickname] = useState(tokenList.nickname);
  const [message, setMessage] = useState(""); //보낸 메시지
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]); //메시지 전체
  const [users, setUsers] = useState<string[]>([]); //입장한 유저 목록
  const [room, setRoom] = useState(title); //방 이름
  const [joined, setJoined] = useState(false);
  const [chatlocal, setChatLocal] = useState([]);

  //useEffect
  useEffect(() => {
    const chatBox = localStorage.getItem("ChatBox");

    setChatLocal(JSON.parse(chatBox!));
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
      //console.log("loca", chatlocal.category);
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

      let chat_data = {
        text: message,
        userid: userid,
        userNickname: userNickname,
        time: formatDate(today),
        roomid: chatlocal.roomid,
      };

      api
        .post(`/chat/${chatlocal.category}/saveMessage`, chat_data)
        .then((res) => {
          console.log("백엔드 저장 완료", res.data);
        })
        .catch((error: string) => {
          console.log("백엔드 저장 실패", error);
        });

      setMessage("");
    }
  };
  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      socket.emit("joinRoom", { room });
      setJoined(true); // 채팅방 생성
    }
  };

  const showDrawer = () => {};
  //전송 버튼 클릭 함수(추후 변수명 변경)
  // const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  //   console.log(info?.source, value);

  return (
    <ChatBoxStyled className={clsx("main-wrap")}>
      <div className="title">
        <span onClick={showDrawer}>
          <img src={arrowback.src} alt="arrow-back" />
        </span>
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
