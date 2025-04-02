import { TodayTopicStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import TopicElement from "../TopicElements";
import TopicTitle from "../TopicTitle";
//Coponent

//list
import { title_lst } from "./datalist";

//today topic main 컴포넌트
const TopicMain = () => {
  const router = useRouter();
  //console.log("title_lst", title_lst);
  return (
    <>
      {title_lst.map((element: { title: string }, index: number) => (
        <TodayTopicStyled className={clsx("main-wrap")} key={index}>
          <TopicTitle title={element.title} />
          <div className="topic-section">
            <TopicElement />
            <TopicElement />
            <TopicElement />
          </div>
        </TodayTopicStyled>
      ))}
    </>
  );
};
export default TopicMain;
