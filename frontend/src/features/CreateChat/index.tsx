import { CreateChatStyle } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { Input, Button } from "antd";
import Header from "@/components/Header";

//Coponent

//채팅방 생성 컴포넌트
const CreateChat = () => {
  //useState

  const router = useRouter();

  const createFormik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      console.log("values", values);
      router.push("/");
      // axios({
      //   method: "post",
      //   url : `http://localhost:3000/chat/${}`
      // });
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
    </>
  );
};
export default CreateChat;
