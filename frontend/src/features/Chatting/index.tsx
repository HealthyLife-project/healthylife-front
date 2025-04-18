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
  const [isModalComponentOpen, setIsModalComponentOpen] = useState(false); //모달 컴포넌트 open 여부
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

    api
      .post(`/chat/${urlstr}/validate`, {
        roomid: Number(selectedRecord?.key),
        userid: Number(tokenList?.id),
      })
      .then((res) => {
        //console.log("Res", res.data);
        //이미 채팅 있는지 확인 후 만약 채팅 내용이 있으면 추가 내용 보기
        if (res.data.result) {
          //사용자 정의 이벤트 실행 - _app.tsx에서 실행 localstroage에서 title 값 넘김
          const event = new CustomEvent("openChat", {
            detail: {
              title: selectedRecord?.title,
              roomid: Number(selectedRecord?.key),
              category: urlstr,
              boolean: res.data,
            },
          });

          //해당 이벤트 실행
          window.dispatchEvent(event);
        } else {
          //처음 입장한 경우
          // localStorage.setItem(
          //   "ChatBox",
          //   JSON.stringify({
          //     title: selectedRecord?.title,
          //     category: urlstr,
          //     isOpen: true,
          //     id: Number(selectedRecord?.key),
          //   })
          // );
          //사용자 정의 이벤트 실행 - _app.tsx에서 실행
          const event = new CustomEvent("openChat", {
            detail: {
              title: selectedRecord?.title,
              roomid: Number(selectedRecord?.key),
              category: urlstr,
              boolean: res.data,
            },
          });
          window.dispatchEvent(event);
        }
      });
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
        setData(convertedData);
      })
      .catch((error: string) => {
        console.log("채팅 목록 리스트 조회 error", error);
      });
  }, [urlstr]);

  const pagination = () => {};

  return (
    <ChattingStyled className={clsx("main-wrap")}>
      <Table<DataType>
        columns={columns}
        onChange={pagination}
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
