import { TodayTopicStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import TopicElement from "../TopicElements";
import TopicTitle from "../TopicTitle";

//Coponent
import HashTagSection from "@/features/MainPage/TodayTopic/HashTagSection";

//list
import { title_lst } from "./datalist";
import api from "@/util/chek";

//today topic, news main 컴포넌트
const TopicMain = () => {
  const router = useRouter();
  //console.log("title_lst", title_lst);

  // api.get("/hashtag/most").then((res) => {
  //   console.log("res", res.data);
  // });

  return (
    <>
      {title_lst.map((element: { title: string }, index: number) => (
        <TodayTopicStyled className={clsx("main-wrap")} key={index}>
          <TopicTitle title={element.title} />
          {index === 0 ? (
            <div className="topic-section">
              <div className="today-img">
                <TopicElement />
              </div>
              <div className="today-hash">
                <HashTagSection />
              </div>
            </div>
          ) : (
            <div className="topic-section">
              <TopicElement />
              <TopicElement />
              <TopicElement />
            </div>
          )}
        </TodayTopicStyled>
      ))}
    </>
  );
};
export default TopicMain;
