import { ChattingStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import api, { ConvertedChatData } from "@/util/chek";
import { useEffect, useState } from "react";
import { convertChatList } from "@/util/chek";
//Coponent

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

  //useState
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 생성 여부
  const [chatTitle, setChatTitle] = useState(""); //채팅방 이름

  //변수 선언
  const router = useRouter();

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

  return (
    <ChattingStyled className={clsx("main-wrap")}>
      <Table<DataType>
        columns={columns}
        dataSource={search.length > 0 ? search : data}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              console.log("클릭된 행:", record);
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

              const event = new CustomEvent("openChat", {
                detail: { title },
              });
              window.dispatchEvent(event);

              setIsModalOpen(true);
            },
          };
        }}
      />
    </ChattingStyled>
  );
};
export default Chatting;
