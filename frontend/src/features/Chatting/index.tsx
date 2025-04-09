import { ChattingStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import api, { ConvertedChatData } from "@/util/chek";
import { useEffect, useState } from "react";
import { convertChatList } from "@/util/chek";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import socket from "@/util/socket"; //웹 소켓 연결

interface DataType {
  key: string;
  title: string;
  cnt: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "이용자수",
    dataIndex: "cnt",
    key: "cnt",
  },
];

//Chatting 컴포넌트
const Chatting = (props: { urlstr: string; search: ConvertedChatData[] }) => {
  //props
  const { urlstr, search } = props;

  //변수 선언
  const router = useRouter();
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 생성 여부
  const [chatTitle, setChatTitle] = useState(""); //채팅방 이름
  const [username, setUserName] = useState(tokenList.name);
  const [joined, setJoined] = useState(false); // 실제 입장 여부

  //채팅방 목록 리스트
  const [data, setData] = useState<DataType[]>([]);

  //채팅 목록 리스트 조회
  useEffect(() => {
    if (!urlstr) return;

    api
      .get(`/chat/chatlist/${urlstr}`)
      .then((res) => {
        //console.log("res", res.data);

        //테이블 리스트 넣기
        const convertedData = convertChatList(res.data);
        setData(convertedData);
        //console.log("data", data);
      })
      .catch((error: string) => {
        console.log("채팅 목록 리스트 조회 error", error);
      });
  }, [urlstr]);

  //채팅방 입장
  const joinRoom = () => {
    if (username.trim() && chatTitle.trim()) {
      socket.emit("joinRoom", { room: chatTitle });

      setJoined(true); // 채팅방 생성
    }
  };

  return (
    <ChattingStyled className={clsx("main-wrap")}>
      <Table<DataType>
        columns={columns}
        dataSource={search.length > 0 ? search : data}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              //console.log("클릭된 행:", record);

              const title = record.title;
              setChatTitle(title);

              localStorage.setItem(
                "ChatBox",
                JSON.stringify({
                  title: title,
                  category: urlstr,
                  isOpen: true,
                })
              );

              //사용자 정의 이벤트 실행 - _app.tsx에서 실행
              const event = new CustomEvent("openChat", {
                detail: { title },
              });
              window.dispatchEvent(event);

              joinRoom();
              setIsModalOpen(true);
            },
          };
        }}
      />
    </ChattingStyled>
  );
};
export default Chatting;
