import { CreateChatStyle } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { Input, Button } from "antd";

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
    <CreateChatStyle className={clsx("main-wrap")}>
      <h1>방 생성하기</h1>
      <form onSubmit={createFormik.handleSubmit}>
        <Input
          name="title"
          placeholder="이름"
          onChange={createFormik.handleChange}
        />
        {/* antd쓸때만 submit지정해주기 */}
        <Button htmlType="submit">생성하기</Button>
      </form>
    </CreateChatStyle>
  );
};
export default CreateChat;
