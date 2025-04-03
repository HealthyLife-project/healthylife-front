import { ChattingStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

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
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
  {
    key: "3",
    title: "현대 백화점",
    cnt: 12,
  },
];
//Chatting 컴포넌트
const Chatting: React.FC = () => {
  //props

  const router = useRouter();

  return (
    <ChattingStyled className={clsx("main-wrap")}>
      <Table<DataType> columns={columns} dataSource={data} />
    </ChattingStyled>
  );
};
export default Chatting;
