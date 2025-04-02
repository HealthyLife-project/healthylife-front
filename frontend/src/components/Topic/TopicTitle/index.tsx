import { TopicTitleStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import TodayTopicElement from "../TopicElements";

//Coponent

//topic title 컴포넌트
const TopicTitle = (props: { title: string }) => {
  const { title } = props;

  const router = useRouter();

  return (
    <TopicTitleStyled className={clsx("main-wrap")}>
      <span className="title">
        <h1>{title}</h1>
      </span>
    </TopicTitleStyled>
  );
};
export default TopicTitle;
