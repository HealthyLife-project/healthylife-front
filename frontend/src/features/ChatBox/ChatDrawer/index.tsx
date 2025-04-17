import clsx from "clsx";
import { DrawerStyled } from "./styled";
import api from "@/util/chek";
import { useEffect, useState } from "react";

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
  //useState
  const [chatlist, setChatList] = useState([""]);
  //const [currentchat, setCurrentChat] = useState(""); //현재 위치해 있는 채팅방 title

  useEffect(() => {
    api
      .get(`/chat/chatlist/${category}`)
      .then((res) => {
        const data = res.data;
        const titles = data.map((item: { title: string }) => item.title);
        setChatList(titles);
        //console.log("채팅방 제목 목록:", titles);
      })
      .catch((error) => {
        console.log("채팅방 목록 error : ", error);
      });
  }, [category]);

  return (
    <DrawerStyled className={clsx("main-wrap", { open: true })}>
      <div className="drawer-header">
        <span>채팅방 목록</span>
        <span className="close-btn" onClick={onClose}>
          ✕
        </span>
      </div>
      <div className="drawer-content">
        {chatlist.map((element: string, index: number) => {
          const isActive = element === title; // 현재 채팅방과 같은지 확인
          return (
            <div
              className={clsx("chat-element", { active: isActive })}
              key={index}
            >
              {element}
            </div>
          );
        })}
      </div>
    </DrawerStyled>
  );
};

export default ChatDrawer;
