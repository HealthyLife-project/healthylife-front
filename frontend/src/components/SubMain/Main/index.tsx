import { SubMainStyled, theme } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import SubMap from "../SubMap";
import SubCategory from "../SubCategory";
import { useEffect, useState } from "react";
import { Button, ConfigProvider } from "antd";
//Coponent

//submain > main 컴포넌트
const SubMain = () => {
  const router = useRouter();

  //useState
  const [urlstr, setUrlStr] = useState("");

  useEffect(() => {
    //console.log(window.location.pathname);
    //현재 선택된 Lcategory 확인
    let pathname = window.location.pathname; //pathName person인지 pet인지 확인용
    if (pathname.includes("person")) {
      setUrlStr("person");
    } else if (pathname.includes("pet")) {
      setUrlStr("pet");
    } else {
      setUrlStr("");
    }
  }, [urlstr]);

  //NewChat 클릭 함수
  const NewChat = () => {
    router.push(`/createchat?category=${urlstr}`);
  };

  //변수 선언

  return (
    <SubMainStyled className={clsx("main-wrap")}>
      <div className="main-left">
        <SubMap />
      </div>

      <div className="main-right">
        <SubCategory urlstr={urlstr} />
        <ConfigProvider theme={theme}>
          <Button onClick={NewChat}>방 생성하기</Button>
        </ConfigProvider>
      </div>
    </SubMainStyled>
  );
};
export default SubMain;
