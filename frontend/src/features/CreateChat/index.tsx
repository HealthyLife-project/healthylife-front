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

//Coponent

//채팅방 생성 컴포넌트
const CreateChat = () => {
  //변수 선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [category, setCategory] = useState("");
  const [id, setId] = useState(tokenList.id);

  //useEffect
  useEffect(() => {
    //console.log(window.location.pathname);
    let params = new URLSearchParams(window.location.search); //pathName person인지 pet인지 확인용
    //console.log(params.get("category"));
    setCategory(params.get("category")!);
  }, []);

  const router = useRouter();

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
          router.push(`/${category}`);
        })
        .catch((error) => {
          console.log("채팅방 생성 버튼 오류 : ", error);
        });
    },
  });

  console.log("createFormik", createFormik.values);

  return (
    <>
      <Header />
      <CreateChatStyle className={clsx("main-wrap")}>
        <div className="chat-box">
          <h1>채팅방 생성하기</h1>
          <div className="chat-title">방 제목 입력</div>
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
