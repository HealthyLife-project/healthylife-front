import clsx from "clsx";
import { ChatBoxStyled, theme } from "./styled";
import { Button, Input, ConfigProvider, Dropdown } from "antd";
import { useState, useEffect } from "react";
import socket from "@/util/socket";
import { join } from "path";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import api from "@/util/chek";
import type { MenuProps } from "antd";
import router from "next/router";

//image
import arrowback from "@/assets/images/arrowback.png";
import menu from "@/assets/images/menu.png";

//component
import ChatDrawer from "../ChatDrawer";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

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
  boolean: boolean;
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
  const [pagecnt, setPageCnt] = useState(1);
  //const [roomid, setRoomid] = useState();

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

  //채팅입력 시 밑에서 부터 스크롤
  useEffect(() => {
    const container = document.querySelector(".content-srcoll");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  //방 입장하기
  const joinRoom = (chatData: ChatBoxLocal) => {
    if (userNickname.trim() && room.trim()) {
      const category = chatData.category;
      const roomid = chatData.roomid;
      const boolean = chatData.boolean;
      socket.emit("joinRoom", {
        userNickname,
        room,
        category,
        roomid,
        userid,
        boolean,
      });

      setJoined(true); // 채팅방 생성
      console.log("room id", chatData);
      //console.log("type",ChatBox)
      // const roomid_num:number = chatData.roomid
      // setRoomid(roomid_num?);

      //입장 시 이전 내용
      api
        .post(`/chat/${chatData.category}/insert`, {
          roomid: Number(chatData.roomid),
          userid: Number(tokenList?.id),
        })
        .then((res: any) => {
          console.log("joinroom", res.data);
          //setMessages(res.data);
        });

      //채팅방 입력 시 이전 내용 불러오기
      console.log("user", chatData.roomid, userid, pagecnt);
      api
        .post(`/chat/${chatData.category}/getMessage`, {
          roomid: chatData.roomid,
          userid: userid,
          page: pagecnt,
          limit: 10,
        })
        .then((res) => {
          console.log("res", res.data);
        });
    }
  };

  useEffect(() => {
    const container = document.querySelector(".content-srcoll");

    const handleScroll = () => {
      if (!container) return;

      // 스크롤이 가장 위에 도달한 경우
      if (container.scrollTop === 0) {
        //console.log("맨 위에 도달함, 이전 채팅 불러오기");
        fetchPreviousMessages(); // 이전 메시지 불러오기 함수 호출
      }
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [messages]);

  const fetchPreviousMessages = () => {
    if (!chatlocal || !userid) return;

    setPageCnt(pagecnt + 1);

    //메시지 조회 후 가져오기 (무한 스크롤)
    api
      .post(`/chat/${chatlocal.category}/getMessage`, {
        roomid: chatlocal.roomid,
        userid: userid,
        page: pagecnt,
        limit: 10,
      })
      .then((res) => {
        const newMessages = res.data;
        if (newMessages && newMessages.length > 0) {
          setMessages((prev) => [...newMessages, ...prev]); // 이전 메시지들을 위에 붙이기
          setPageCnt(pagecnt); // 페이지 수 증가
        }
      })
      .catch((error) => {
        console.error("이전 메시지 불러오기 실패", error);
      });
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

      console.log("chat data", arr);

      //db 저장 요청
      api
        .post(`/chat/${chatlocal?.category}/saveMessage`, arr)
        .then((res) => {
          //console.log("REs", res.data);
          console.log("백엔드 저장 완료", res.data);
        })
        .catch((error: string) => {
          //console.log("백엔드 저장 실패", error);
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

  //메뉴 모달
  const menuModal = () => {
    const MySwal = withReactContent(Swal);
    console.log("chat", chatlocal?.roomid);

    //채팅방 나가기
    api
      .delete(`/chat/${chatlocal?.category}/delete/${tokenList?.id}`, {
        params: {
          roomid: chatlocal?.roomid,
        },
      })
      .then((res) => {
        console.log("요청 성공");

        MySwal.fire({
          title: "체팅방을 나가실 건가요?",
          footer: "채팅방을 나가시면 이전 내용은 확인 할 수 없습니다.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            socket.disconnect();
            onClose();
          }
        });
      });
  };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <div onClick={menuModal}>채팅방 나가기</div>,
    },
  ];

  return (
    <>
      <ChatBoxStyled className={clsx("main-wrap")}>
        <div className="title">
          <span onClick={showDrawer}>
            <img src={arrowback.src} alt="arrow-back" />
          </span>

          <span>{title}</span>
          <div className="menu">
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <span className="menu-bar" onClick={(e) => e.preventDefault()}>
                <img src={menu.src} alt="menu" />
              </span>
            </Dropdown>

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
          <div className="content-srcoll">
            <div className="content">
              {messages.map((msg, index) =>
                msg.aopen ? (
                  <p key={index}>
                    <strong>{msg.aopen}</strong>
                  </p>
                ) : (
                  <div className="chat-content" key={index}>
                    <strong>{msg.userNickname}: </strong> {msg.message}
                  </div>
                )
              )}
            </div>
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
