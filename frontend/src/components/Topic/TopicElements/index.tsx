import { TopicElementStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Coponent

//today topic 요소 컴포넌트
const TopicElement = () => {
  const router = useRouter();

  return (
    <TopicElementStyled className={clsx("main-wrap")}>
      news 요소 컴포넌트
    </TopicElementStyled>
  );
};
export default TopicElement;
