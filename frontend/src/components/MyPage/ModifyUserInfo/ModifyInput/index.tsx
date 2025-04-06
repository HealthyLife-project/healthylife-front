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
  const [id, setId] = useState(tokenList.id);

  const modifyFormik = useFormik({
    initialValues: {
      name: "",
      age: "",
      nickName: "",
    },
    onSubmit: (values) => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      console.log("values", values);
      // axios({
      //   method: "put",
      //   url: `http://localhost:5001/mypage/modify`,
      //   // data: { id: userid, userifo: values },
      // })
      //   .then((res) => {
      //     console.log("res", res.data);
      //   })
      //   .catch((error: string) => {
      //     console.log("error", error);
      //   });

      api
        .put(`mypage/modify/${id}`)
        .then((res) => {
          console.log("res", res.data);
          //notification("수정완료 되었습니다");
        })
        .catch((error: string) => {
          console.log("error", error);
        });
    },
  });

  console.log("modifyFormik", modifyFormik.values.name);

  return (
    <ModifyInputStyle className={clsx("main-wrap")}>
      <form onSubmit={modifyFormik.handleSubmit}>
        <Input name="name" placeholder="이름" />
        <Input name="age" placeholder="나이" />
        <Input name="nickName" placeholder="닉네임" />

        {/* antd쓸때만 submit지정해주기 */}
        <Button htmlType="submit">저장</Button>
      </form>
    </ModifyInputStyle>
  );
};
export default ModifyInput;
