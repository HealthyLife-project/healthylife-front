import { ChattingStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Space, Table, Modal } from "antd";
import type { TableProps } from "antd";
import api, { ConvertedChatData } from "@/util/chek";
import { useEffect, useState } from "react";
import { convertChatList } from "@/util/chek";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import socket from "@/util/socket"; //웹 소켓 연결

//util
import { joinChatRoom } from "@/util/joinroom";

//hook
import useCheckLoginAlert from "@/hook/useCheckLoginAlert ";

interface DataType {
  key: string;
  title: string;
  cnt: number;
  id?: number;
}

//antd 테이블 행
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
  const [chatTitle, setChatTitle] = useState(""); //채팅방 이름
  const [username, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 채팅방 open 유무
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null); //선택한 행의 내용

  //hook
  const checkLogin = useCheckLoginAlert();

  //채팅방 목록 리스트
  const [data, setData] = useState<DataType[]>([]);

  //로그인 확인
  useEffect(() => {
    const isLogin = checkLogin(tokenList);

    if (isLogin) {
      setUserName(tokenList?.name);
    }
  }, [tokenList]);

  //모달 open
  const showModal = () => {
    setIsModalOpen(true);
  };

  //모달 확인
  const handleOk = () => {
    setIsModalOpen(false);
    //console.log("user", username);
    if (!username) {
      alert("상세 정보를 입력해 주세요.");
      router.push("/mypage");
      return;
    }
    //console.log("dsf", selectedRecord);

    if (selectedRecord) {
      joinChatRoom({
        urlstr,
        record: selectedRecord?.key,
        title: selectedRecord?.title,
        userId: tokenList?.id,
        username,
        router,
      });
    }
  };

  //모달 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //채팅 목록 리스트 조회
  useEffect(() => {
    if (!urlstr) return;
    api
      .get(`/chat/chatlist/${urlstr}`)
      .then((res) => {
        //테이블 리스트 넣기
        const convertedData = convertChatList(res.data);
        //console.log("convertedData", convertedData);
        setData(convertedData);
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
          //console.log(record);
          return {
            onClick: () => {
              //console.log("클릭된 행:", record);
              const title = record.title;
              setChatTitle(title);
              setSelectedRecord(record);
              showModal();
            },
          };
        }}
      />
      <Modal
        title={`${chatTitle} 채팅방`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>채팅방을 입장하시겠습니까?</div>
      </Modal>
    </ChattingStyled>
  );
};
export default Chatting;
