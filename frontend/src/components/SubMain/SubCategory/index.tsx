import { SubCategoryStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import Chatting from "@/features/Chatting";
import { useState, useEffect } from "react";

//Coponent

//submain > main > 단체 채팅방 전체 컴포넌트
const SubCategory = (props: { urlstr: string }) => {
  //props
  const { urlstr } = props;

  //useState
  //const [category, setCategory] = useState("");

  const router = useRouter();

  //변수 선언

  return (
    <SubCategoryStyled className={clsx("main-wrap")}>
      <Chatting urlstr={urlstr} />
    </SubCategoryStyled>
  );
};
export default SubCategory;
