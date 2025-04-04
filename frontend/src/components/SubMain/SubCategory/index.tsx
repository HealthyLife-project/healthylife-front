import { SubCategoryStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import Chatting from "@/features/Chatting";
import { useState, useEffect } from "react";

//Coponent

//submain > main > 단체 채팅방 전체 컴포넌트
const SubCategory = () => {
  //useState
  const [category, setCategory] = useState("");

  const router = useRouter();

  //변수 선언

  useEffect(() => {
    //console.log(window.location.pathname);
    let pathname = window.location.pathname; //pathName person인지 pet인지 확인용
    if (pathname.includes("person")) {
      setCategory("person");
    } else if (pathname.includes("pet")) {
      setCategory("pet");
    } else {
      setCategory("");
    }
  }, []);

  return (
    <SubCategoryStyled className={clsx("main-wrap")}>
      <Chatting category={category} />
    </SubCategoryStyled>
  );
};
export default SubCategory;
