import { ChatRoomStyle } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import Header from "@/components/Header";
import api from "@/util/chek";
import { useState } from "react";

//각 채팅방 페이지
const ChatRoom = (props: { id: string; urlstr: string }) => {
  //props
  const { id, urlstr } = props;
  // console.log("urlstr", urlstr);
  //useState
  const [title, setTitle] = useState("");

  api
    .get(`/chat/${urlstr}/${id}`)
    .then((res) => {
      console.log("res", res.data);
    })
    .catch((error: string) => {
      console.log("채팅방 이름 가져오기 오류 : ", error);
    });

  //console.log("현재 페이지 ", id);

  return (
    <>
      <Header />
      <ChatRoomStyle className={clsx("main-wrap")}></ChatRoomStyle>
    </>
  );
};

export default ChatRoom;
