import { CreateChatStyle } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import { Input, Button } from "antd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useCheckLoginAlert from "@/hook/useCheckLoginAlert ";

//Coponent

//채팅방 생성 컴포넌트
const CreateChat = () => {
  //변수 선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수
  const router = useRouter();

  //useState
  const [category, setCategory] = useState("");
  const [id, setId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 생성 여부
  const [chatTitle, setChatTitle] = useState(""); //채팅방 이름

  //hook
  const checkLogin = useCheckLoginAlert();

  //useEffect
  useEffect(() => {
    //console.log(window.location.pathname);
    let params = new URLSearchParams(window.location.search); //pathName person인지 pet인지 확인용
    //console.log(params.get("category"));
    setCategory(params.get("category")!);
  }, []);

  //로그인 확인
  useEffect(() => {
    const isLogin = checkLogin(tokenList);

    if (!isLogin) {
      setId(tokenList?.id);
    }
  }, [tokenList]);

  const createFormik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values): void => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      //console.log("values", values);
      //router.push("/");

      api
        .post(`/chat/${category}/create`, {
          id: Number(id),
          title: values.title,
        })
        .then((res) => {
          //console.log("res", res.data);
          alert("채팅방 생성 성공!");

          localStorage.setItem(
            "ChatBox",
            JSON.stringify({
              title: values.title,
              category: category,
              isOpen: true,
            })
          );

          setChatTitle(values.title);
          setIsModalOpen(true);

          router.push(`/${category}`);
        })
        .catch((error) => {
          console.log("채팅방 생성 버튼 오류 : ", error);
        });
    },
  });

  //console.log("createFormik", createFormik.values);

  return (
    <>
      <Header />
      <CreateChatStyle className={clsx("main-wrap")}>
        <div className="chat-box">
          <h1>채팅방 생성하기</h1>
          <div className="chat-title">방 제목 입력</div>
          <div>
            한번 생성된 채팅방은 모든 유저가 나가기 전까지 삭제되지 않습니다
          </div>
          <div>방 제목을 신중하게 작성해 주세요!</div>
          <form onSubmit={createFormik.handleSubmit}>
            <Input
              name="title"
              placeholder="채팅방 이름을 입력하세요"
              onChange={createFormik.handleChange}
              className="chat-input"
            />

            <Button htmlType="submit" type="primary" className="chat-button">
              생성하기
            </Button>
          </form>
        </div>
      </CreateChatStyle>
      <Footer />
    </>
  );
};
export default CreateChat;
