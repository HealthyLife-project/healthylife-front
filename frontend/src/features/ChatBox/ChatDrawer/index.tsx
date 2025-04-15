import clsx from "clsx";
import { DrawerStyled } from "./styled";
import api from "@/util/chek";
import { useEffect, useState } from "react";

interface ChatDrawerProps {
  onClose: () => void;
  category: string;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ onClose, category }) => {
  //useState
  const [chatlist, setChatList] = useState([""]);

  useEffect(() => {
    api
      .get(`/chat/chatlist/${category}`)
      .then((res) => {
        const data = res.data;
        const titles = data.map((item: { title: string }) => item.title);
        setChatList(titles); // 여기가 이제 안전해짐
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
          return (
            <div className="chat-element" key={index}>
              {element}
            </div>
          );
        })}
      </div>
    </DrawerStyled>
  );
};

export default ChatDrawer;
