import { MyMain } from "./styled";
import clsx from "clsx";
import { headerlst } from "./headerlist";

//Component
import Header from "@/components/Header";
import Userinfo from "../UserInfo";
import ExerciseInfo from "../ExerciseInfo";
import ExerciseAndMeal from "../ExerciseAndMeal";
import ModifyUserInfo from "../ModifyUserInfo/Main";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "antd";

const MyPageMain = () => {
  const [activeTab, setActiveTab] = useState("1");
  const token = useSelector((state: RootState) => state.token.tokenList);

  //카테고리
  const items = [
    {
      key: "1",
      label: headerlst[0]?.category || "정보",
      children: <Userinfo />,
    },
    {
      key: "2",
      label: headerlst[1]?.category || "운동",
      children: <ExerciseInfo />,
    },
    {
      key: "3",
      label: headerlst[2]?.category || "운동&식단",
      children: <ExerciseAndMeal />,
    },
    {
      key: "4",
      label: headerlst[3]?.category || "프리미엄",
      children: <ModifyUserInfo />,
    },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const signup = searchParams.get("signup");
    if (signup) {
      setActiveTab("4");
    }
  }, []);

  return (
    <MyMain className={clsx("main-wrap")}>
      <Header />
      <div className="tabs-header">
        {items.map((item) => (
          <Button
            key={item.key}
            className={clsx("tab-button", { active: item.key === activeTab })}
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="tab-content">
        {items.find((item) => item.key === activeTab)?.children}
      </div>
    </MyMain>
  );
};

export default MyPageMain;
