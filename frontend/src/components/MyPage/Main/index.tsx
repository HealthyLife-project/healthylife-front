import { MyMain, theme } from "./styled"; //스타일
import clsx from "clsx";

import { headerlst } from "./headerlist";
import { Tabs, ConfigProvider } from "antd";

//Component
import Header from "@/components/Header";
import Userinfo from "../UserInfo";
import ExerciseInfo from "../ExerciseInfo";
import ExerciseAndMeal from "../ExerciseAndMeal";
import ModifyUserInfo from "../ModifyUserInfo/Main";
import { useEffect, useState } from "react";
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

  //category만 추출
  headerlst.map((element: { id: number; category: string }, index: number) => {
    category_lst.push(element.category);
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const signup = searchParams.get("signup");

    if (signup) {
      setDefualtTab("4");
    }

    //console.log("signup", signup);
  }, []);

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

  return (
    <>
      <MyMain className={clsx("main-wrap")}>
        <Header />
        <ConfigProvider theme={theme}>
          <Tabs
            className={clsx("tabs-header")}
            activeKey={defualtTap} //초기 탭
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
