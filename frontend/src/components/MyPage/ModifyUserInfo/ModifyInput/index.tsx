import { ModifyInputStyle } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import axios from "axios";
import { Input, Button } from "antd";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
//Component

//개인정보 컴포넌트
const ModifyInput = () => {
  const router = useRouter();
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [id, setId] = useState(tokenList.id);
  //const [name, setName] = useState(""); //수정 이름

  const modifyFormik = useFormik({
    initialValues: {
      name: "",
      age: "",
      nickName: "",
      address: "",
      email: "",
      phone: "",
      hashtag: "",
    },
    onSubmit: (values) => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      console.log("values", values);

      api
        .post(`mypage/modify/${id}`, { id: id, userifo: values })
        .then((res) => {
          console.log("res", res.data);
          //notification("수정완료 되었습니다");
        })
        .catch((error: string) => {
          console.log("error", error);
        });
    },
  });

  return (
    <ModifyInputStyle className={clsx("main-wrap")}>
      <form onSubmit={modifyFormik.handleSubmit}>
        <Input
          name="name"
          placeholder="이름"
          onChange={modifyFormik.handleChange}
          value={modifyFormik.values.name}
        />
        <Input
          name="nickName"
          placeholder="닉네임"
          onChange={modifyFormik.handleChange}
          value={modifyFormik.values.nickName}
        />
        <Input
          name="age"
          placeholder="나이"
          onChange={modifyFormik.handleChange}
          value={modifyFormik.values.age}
        />
        <Input
          name="address"
          placeholder="주소"
          onChange={modifyFormik.handleChange}
          value={modifyFormik.values.address}
        />
        <Input
          name="email"
          placeholder="이메일"
          onChange={modifyFormik.handleChange}
          value={modifyFormik.values.email}
        />
        <Input
          name="phone"
          placeholder="전화번호"
          onChange={modifyFormik.handleChange}
          value={modifyFormik.values.phone}
        />
        <Input
          name="hashtag"
          placeholder="해시태그"
          onChange={modifyFormik.handleChange}
          value={modifyFormik.values.hashtag}
        />

        <Button htmlType="submit">저장</Button>
      </form>
    </ModifyInputStyle>
  );
};
export default ModifyInput;
