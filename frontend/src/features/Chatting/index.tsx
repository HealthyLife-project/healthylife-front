import { ChattingStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import axios from "axios";

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
const Chatting = (props: { urlstr: string }) => {
  //props
  const { urlstr } = props;

  const router = useRouter();

  //채팅방 임시 목록 리스트
  const data: DataType[] = [
    {
      key: "1",
      title: "원숭이 동물원 마을",
      cnt: 2,
    },
    {
      key: "2",
      title: "사람 카테고리",
      cnt: 2,
    },
    {
      key: "3",
      title: "현대 백화점",
      cnt: 12,
    },
    {
      key: "4",
      title: "현대 백화점",
      cnt: 12,
    },
    {
      key: "5",
      title: "현대 백화점",
      cnt: 12,
    },
    {
      key: "6",
      title: "현대 백화점",
      cnt: 12,
    },
    {
      key: "7",
      title: "현대 백화점",
      cnt: 12,
    },
    {
      key: "8",
      title: "현대 백화점",
      cnt: 12,
    },
  ];

  //채팅 목록 리스트 조회
  axios({
    method: "get",
    url: `http://localhost:3000/chatlist/${urlstr}`,
  })
    .then((res) => {
      console.log("res", res.data);
    })
    .catch((error: string) => {
      console.log("error", error);
    });

  return (
    <ChattingStyled className={clsx("main-wrap")}>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        // onRow={(record, rowIndex) => {
        //   return;
        // }}
      />
    </ChattingStyled>
  );
};
export default Chatting;
