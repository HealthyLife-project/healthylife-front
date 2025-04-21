import clsx from "clsx";
import { DrawerStyled } from "./styled";
import api from "@/util/chek";
import { useEffect, useState } from "react";
import { joinChatRoom } from "@/util/joinroom";
import router from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ChatItem {
  title: string;
  createdAt: string;
  id: number;
  userid: string;
}

interface ChatDrawerProps {
  onClose: () => void;
  category: string;
  title: string;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({
  onClose,
  category,
  title,
}) => {
  //변수선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [chatlist, setChatList] = useState<ChatItem[]>([]);

  useEffect(() => {
    api
      .get(`/chat/chatlist/${category}`)
      .then((res) => {
        const data = res.data;
        console.log("data", data);
        //const titles = data.map((item: { title: string }) => item.title);
        setChatList(data);
      })
      .catch((error) => {
        console.log("채팅방 목록 error : ", error);
      });
  }, [category]);

  const showChat = (element: ChatItem) => {
    console.log("sdf", element);
    const roomid = element.id;
    joinChatRoom({
      urlstr: category,
      record: roomid.toString(),
      title: element.title,
      userId: Number(element.userid),
      username: tokenList?.name,
      router,
    });
  };

  return (
    <DrawerStyled className={clsx("main-wrap", { open: true })}>
      <div className="drawer-header">
        <span>채팅방 목록</span>
        <span className="close-btn" onClick={onClose}>
          ✕
        </span>
      </div>
      <div className="drawer-content">
        {chatlist?.map((element, index: number) => {
          const isActive = element.title === title; // 현재 채팅방과 같은지 확인
          return (
            <div
              className={clsx("chat-element", { active: isActive })}
              key={index}
              onClick={() => {
                showChat(element);
              }}
            >
              {element.title}
            </div>
          );
        })}
      </div>
    </DrawerStyled>
  );
};

export default ChatDrawer;
