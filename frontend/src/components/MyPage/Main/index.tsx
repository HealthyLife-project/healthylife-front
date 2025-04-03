import { MyMain, theme } from "./styled"; //스타일
import clsx from "clsx";
import axios from "axios";

import { headerlst } from "./headerlist";
import { Tabs, ConfigProvider } from "antd";

//Component
import Header from "@/components/Header";
import Userinfo from "../UserInfo";
import ExerciseInfo from "../ExerciseInfo";
import ExerciseAndMeal from "../ExerciseAndMeal";
import ModifyUserInfo from "../ModifyUserInfo";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

//마이페이지 메인 컴포넌트
const MyPageMain = () => {
  //변수 선언
  let category_lst: string[] = []; //카테고리 용 배열

  //useState
  const [defualtTap, setDefualtTab] = useState("1");

  const token = useSelector((state: RootState) => state.token.tokenList);
  //console.log("store token", token);

  headerlst.map((element: { id: number; category: string }, index: number) => {
    category_lst.push(element.category);
  });

  //console.log("cate", category_lst);

  //카테고리 헤더 이동 배열
  const items = [
    {
      key: "1",
      label: category_lst[0],
      children: <Userinfo />,
    },
    {
      key: "2",
      label: category_lst[1],
      children: <ExerciseInfo />,
    },
    {
      key: "3",
      label: category_lst[2],
      children: <ExerciseAndMeal />,
    },
    {
      key: "4",
      label: category_lst[3],
      children: <ModifyUserInfo />,
    },
  ];

  //토큰
  // axios({
  //   method: "get",
  //   url: "http://localhost:5001/auth/cookie",
  //   withCredentials: true,
  // })
  //   .then((res) => {
  //     console.log("토큰 정보:", res.data);
  //   })
  //   .catch((err) => {
  //     console.error("토큰 확인 에러 발생:", err);
  //   });

  return (
    <>
      <MyMain className={clsx("main-wrap")}>
        <Header />
        <ConfigProvider theme={theme}>
          <Tabs
            className={clsx("tabs-header")}
            defaultActiveKey={defualtTap} //초기 탭
            items={items}
            type="card"
            centered
          />
        </ConfigProvider>
      </MyMain>
    </>
  );
};

export default MyPageMain;
